const express=require('express')
const router=express.Router()
const Group=require('../model/Group')
const GroupMapping=require('../model/Group_Mapping')
const User=require('../model/User')
const auth=require('../middleware/auth')
const GroupTransactions=require('../model/GroupTransactions')

//create a group
router.post('/group/creategroup',auth, async (req,res)=>{
    try{
    const create=new Group({
        ownerId:req.user._id,
        groupName:req.body.name
    })
    if(await create.save()){

    console.log(create)
    const groupmapping=new GroupMapping({
        userId:req.user._id,
        groupId:create._id,
    })
    await groupmapping.save()

    }

    res.status(201).send(create)
    }
    catch(e){
        res.status(400).send(e)
    }

})



//add people to the group
router.post('/group/add',auth,async (req,res)=>{
    try{
        const groupmapping=new GroupMapping({
            userId:req.body.friendId,
            groupId:req.body.groupId
        })
        await groupmapping.save()

        res.status(201).send("added to the group")
    }
    catch(e){
        res.status(400).send("Error")
    }

})



//Add a Transaction
router.post('/group/addtransaction',auth,async (req,res)=>{
    try{
        const groupmapping=new GroupTransactions({
            amount:req.body.amount,
            userId:req.body.userId,
            groupId:req.body.groupId,
        })
        await groupmapping.save()

        res.status(201).send("Transaction added")
    }
    catch(e){
        res.status(400).send(e)
    }
}) 







//add a transaction to a group
router.get('/group/allgroups',auth,async (req,res)=>{
    try{
    const groups=await Group.find({ownerId:req.user._id}).exec()
    res.status(200).send(groups)

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

//get all the members
router.post('/group/members',auth,async (req,res)=>{
    try{
        const members=await GroupMapping.find({groupId:req.body.groupId}).exec()
        let arr=[]

        await asyncForEach(members, async (user) => {
            const user1=await User.findById(user.userId)
            arr.push(user1)
            //console.log(num);
          });

        res.status(201).send(arr)
    }
    catch(e){
        res.status(400).send("Error")
    }
})



///custom comparator

function compare(a,b){
    if(a.amount<b.amount)
    return -1;
    if(a.amount>b.amount)
    return 1;

    return 0;

}

//who owes who//
router.post('/group/whooweswho',auth,async (req,res)=>{

    try{
        const members=await GroupMapping.find({groupId:req.body.groupId}).exec()
        let arr=[]
        let user=[]

       // console.log(members)
        for(var i=0;i<members.length;i++){
            arr.push({userId:members[i].userId})
        }

        //console.log(arr)

        var totalAmount=0


        for(var i=0;i<arr.length;i++){
            var amount=0;
            const tran=await GroupTransactions.find({userId:arr[i].userId,groupId:req.body.groupId}).exec()

           // console.log(tran.length)
            const details=await User.findOne({_id:arr[i].userId}).exec()
            //console.log(details)
            for(var j=0;j<tran.length;j++){
                amount+=tran[j].amount;
            }

            totalAmount+=amount

            user.push({
                name:details.name,
                id:arr[i].userId,
                amount:amount
            })
        }

        var split=totalAmount/(arr.length)
        console.log(split)
        for(var i =0;i<user.length;i++){
            user[i].amount-=split
        }


        var i=0,j=arr.length-1

        user.sort(compare)
        console.log(user)

        var state=[]

        while(i<j){
           // console.log(i,j)
            if(Math.abs(user[j].amount)>=Math.abs(user[i].amount)){
                user[j].amount+=user[i].amount
                state.push(`${user[i].name} owes ${-user[i].amount} to ${user[j].name}`)
                user[i].amount=0          
            }
           
            else{
                user[i].amount+=user[j].amount
                state.push(`${user[i].name} owes ${user[j].amount} to ${user[j].name}`)
                user[j].amount=0
                //console.log(i,j,"Hello")
            }
            if(user[i].amount===0){
                i++;
            }
            if(user[j].amount===0){
                j--;
            }
        }
        res.status(200).send(state)
    }
    catch(e){
        res.status(400).send(e)
    }
    

})







module.exports=router