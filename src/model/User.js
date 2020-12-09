const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:{  
        type:String,
        required:true,
        },
    email:{
        type:String,
        required:true,
        },
    password:{
        type:String,
        required:true,
        }
});

UserSchema.virtual('friends',{
    ref:'Friend',
    localField:'_id',
    foreignField:'userId'
})

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


