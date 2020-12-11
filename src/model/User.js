const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    name:{  
        type:String,
        required:true,
        },
    email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true,
        },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }            
        }
    ]
});

UserSchema.virtual('friends',{
    ref:'Friend',
    localField:'_id',
    foreignField:'userId'
})

UserSchema.methods.generateAuthToken = async function(){
    const user=this
    const token=jwt.sign({_id :  user._id.toString()}, 'thisisthenewcourse')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.static.findByCredentails= async function(email,password){
    const user=await User.findOne({email:email})
    if(!user){
        throw new Error("User not found")
    }

    const isMatch=bcrypt.compareSync(password,user.password)
    if(!isMatch){
        throw new Error("Unable to Login")
    }
    return user
}

UserSchema.pre('save', async function(next){
  
        const user=this
        if(user.isModified('password')){
            const hashed=await bcrypt.hash(user.password,8)
            user.password=hashed
            console.log(user)
        }
        next()
});

const User=mongoose.model('User',UserSchema);


module.exports=User;


