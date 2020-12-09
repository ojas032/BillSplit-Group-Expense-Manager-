const express = require('express')
const app = express()
const User=require('./src/model/User')
const Group=require('./src/model/Create_Group')
const AddFriend=require('./src/model/friend')
require('./src/db/mongoose')
const port = 3002


app.use(express.json())



//User SignUp
app.post('/users',async (req,res)=>{
   // console.log(req.body)
   const user=new User(req.body)
    try{
    await user.save()
    res.status(201).send(req.body)
    }
    catch(e){
        res.status(401).send(e)
    }
})


//Get All the User have to remove it later
app.get('/',async (req,res)=>{
    try{
    const rep=await User.find().exec()
    res.status(200).send(rep)
    }
    catch(e){
        res.status(401).send(e)

    }
})


//Create group
app.post('/creategroup',async (req,res)=>{
    try{
        const group=new Group(req.body)
        await group.save()
        res.status(201).send(req.body)
    }
    catch(e){
        req.status(401).send(e)
    }
})



//Add friend



app.post('/addfriend',async (req,res)=>{
    try{
        const friend= new AddFriend(req.body)
        await friend.save()
        res.status(201).send("Friend Added")
    }
    catch(e){
        res.status(401).send(e)
    }
})



//asyncForEach defined to read about it
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

app.get('/getfriend',async (req,res)=>{
    try{
    const users=await User.findOne({_id:req.body.userId})
    //console.log(users)
    await users.populate('friends').execPopulate()
    //console.log(users.friends)
    let arr=[]
        await asyncForEach(users.friends, async (user) => {
            const user1=await User.findById(user.friendId)
            arr.push(user1)
            //console.log(num);
          });
          console.log('Done');
        //return user
    console.log(arr)
    res.status(200).send(arr)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})