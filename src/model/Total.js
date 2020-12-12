const mongoose=require('mongoose')
require('mongoose-double')(mongoose);

const TotalSchema=new mongoose.Schema({
    amount:{
        type:mongoose.Schema.Types.Double,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})


const Total=mongoose.model('Total',TotalSchema)


module.exports=Total