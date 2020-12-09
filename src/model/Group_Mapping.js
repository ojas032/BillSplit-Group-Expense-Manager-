const mongoose=require('mongoose')

const GroupMappingSchema=new mongoose.Schema({
    userid:{
        type:mongoose.ObjectId,
        required:true
    },
    groupid:{
        type:mongoose.ObjectId,
        required:true
    },
    spent:{
        type:Number,
        default:0
    },
    paid:{
        type:Number,
        default:0
    },
    createdon:{
        type:Date,
        default:Date.now
    }
});



const GroupMapping=mongoose.model('GroupMapping',GroupMappingSchema)

module.exports=GroupMapping