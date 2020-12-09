const mongoose=require('mongoose')

const GroupSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    createdby:{
        type:mongoose.ObjectId,
        required:true,
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Boolean,
        default:false,
    }
});



const Group=mongoose.model('Group',GroupSchema)


module.exports=Group