const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Group_Expense_Manager', {useNewUrlParser: true,useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected Successfully")
});



