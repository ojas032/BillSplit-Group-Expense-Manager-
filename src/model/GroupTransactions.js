const mongoose=require('mongoose')
require('mongoose-double')(mongoose)

const GroupTranSchema=new mongoose.Schema({
    amount:{
        type:mongoose.Schema.Types.Double,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const GroupTransaction=mongoose.model('GroupTranscation',GroupTranSchema)

module.exports=GroupTransaction