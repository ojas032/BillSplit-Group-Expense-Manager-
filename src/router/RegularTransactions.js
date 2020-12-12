const express=require('express')
const router=express.Router()
const User=require('../model/User')
const Transaction=require('../model/Transaction')
const auth=require('../middleware/auth')
const Total=require('../model/Total')


router.post('/addtransaction',auth,async (req,res)=>{
    try{

        var total=await Total.findOne({userId:req.user._id,friendId:req.body._id}).exec() 
        var total1=await Total.findOne({userId:req.body._id,friendId:req.user._id}).exec()

        const amount=req.body.amount
        var transaction=new Transaction({
            amount:req.body.amount,
            userId:req.user._id,
            friendId:req.body._id
        })

        await transaction.save()

        transaction=new Transaction({
            amount:-req.body.amount,
            userId:req.body._id,
            friendId:req.user._id
        })

        await transaction.save()

        if(!total){
            total=new Total({
                amount:req.body.amount,
                userId:req.user._id,
                friendId:req.body._id
            })

            await total.save()

            total=new Total({
                amount:-req.body.amount,
                userId:req.body._id,
                friendId:req.user._id
            })
            await total.save()
        }
        else{

            var amt=total.amount
            amt+=req.body.amount
            await total.update({amount:amt})

            var amt1=total1.amount
            amt1-=req.body.amount
            await total1.update({amount:amt1})

        }
        res.status(201).send('OK')

    }
    catch(e){
        res.status(401).send("Network error")
    }
})



router.post('/transaction',auth,async (req,res)=>{
    try{

        const result=await Transaction.find({userId:req.user._id,friendId:req.body.id}).exec()
        res.status(201).send(result)
    }
    catch(e){
        res.status(401).send("error")
    }
})


//get the total balance to a particular person
router.post('/total',auth,async (req,res)=>{
    try{
        const amount=await Total.find({userId:req.user._id,friendId:req.body._id}).exec()
        res.status(201).send(amount)
    }
    catch(e){
        res.status(401).send(e)
    }
})

module.exports=router