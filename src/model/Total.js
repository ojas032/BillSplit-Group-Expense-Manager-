const mongoose=require('mongoose')

const TotalSchema=new mongoose.Schema({
    amount={
        type:mongoose.Decimal128,
        required:true,
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