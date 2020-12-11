const mongoose=require('mongoose')

const TransactionSchema=new mongoose.Schema({
    amount:{
        type:mongoose.Decimal128,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})





const Transaction=mongoose.model('Transaction',TransactionSchema)

module.exports=Transaction