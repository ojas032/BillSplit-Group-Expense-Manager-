const mongoose=require('mongoose')
require('mongoose-double')(mongoose)

const GroupSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    groupName:{
        type:String,
        required:true,
        unique:true,
    },
    createdon:{
        type:Date,
        default:Date.now
    }
})

const Group=mongoose.model('Group',GroupSchema)

module.exports=Group


