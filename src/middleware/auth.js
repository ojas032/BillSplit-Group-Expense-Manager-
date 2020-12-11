const jwt=require('jsonwebtoken')
const User=require('../model/User')

const user = async (req,res,next)=>{

    try{
    var token=req.header('Authorization')
    token=token.replace('Bearer ','')
    //console.log(token)
    const decode=jwt.verify(token,'thisisthenewcourse');
    console.log(decode)
    const user=await User.findOne({_id:decode._id,'tokens.token':token})
    if(!user){
        throw new Error()
    }
    req.user=user
    req.token=token
    next()
    }
    catch(e){
        res.status(401).send(e)
    }

}

module.exports=user