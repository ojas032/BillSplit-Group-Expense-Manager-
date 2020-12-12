const mongoose=require('mongoose')
require('mongoose-double')(mongoose)

const GroupMappingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    spent:{
        type:mongoose.Schema.Types.Double,
        default:0
    },
    paid:{
        type:mongoose.Schema.Types.Double,
        default:0
    },
    createdon:{
        type:Date,
        default:Date.now
    }
});



const GroupMapping=mongoose.model('GroupMapping',GroupMappingSchema)

module.exports=GroupMapping