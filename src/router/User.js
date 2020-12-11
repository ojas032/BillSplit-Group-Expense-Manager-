const express=require('express')
const router=express.Router()
const User=require('../model/User')
const auth=require('../middleware/auth')


//User SignUp
router.post('/users',async (req,res)=>{
    // console.log(req.body)
    const user=new User(req.body)
    
     try{
     const token=await user.generateAuthToken()
     console.log(token)
     const result=await user.save()
     res.status(201).send({result,token})
     }
     catch(e){
         res.status(401).send(e)
     }
 })
 
 //Login 
 router.post('/users/login',async (req,res)=>{
     try{
         const user=await User.findByCredentails(req.body.email,req.body.password)
         const token=await user.generateAuthToken()
         res.status(201).send({user,token})
     }
     catch(e){
         res.status(401).send(e)
     }
 })

 //Get a friend
 router.post('/users/getfriend',auth,async (req,res)=>{
     try{
         const friend=User.find({email:req.body.email})
         if(!friend){
             throw new Error('NO such friend exists')
         }
         res.status(201).send(friend)
     }
     catch(e){
         res.status(401).send(e)
     }
 })
 
 
 //Get All the User have to remove it later
 router.get('/',auth,async (req,res)=>{
     try{
     const rep=await User.find().exec()
     res.status(200).send(rep)
     }
     catch(e){
         res.status(401).send(e)
 
     }
 })
 



module.exports=router