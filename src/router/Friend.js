const express=require('express')
const router=express.Router()
const User=require('../model/User')
const AddFriend=require('../model/friend')
const auth=require('../middleware/auth')



//Add friend
router.post('/addfriend',auth,async (req,res)=>{
    try{
        var friend= new AddFriend({
            userId:req.user._id,
            friendId:req.body.friendId
        })
        await friend.save()
        friend= new AddFriend({
            userId:req.body.friendId,
            friendId:req.user._id
        })
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

// person can get all his friends
router.get('/getfriend',auth,async (req,res)=>{
    try{
    const users=req.user
    //console.log(users)
    await users.populate('friends').execPopulate()
    //console.log(users.friends)
    let arr=[]
        await asyncForEach(users.friends, async (user) => {
            const user1=await User.findById(user.friendId)
            arr.push(user1)
            //console.log(num);
          });
    res.status(200).send(arr)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports=router