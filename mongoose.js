const jwt=require('jsonwebtoken')

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
var decode=jwt.decode(token,{complete:true})
console.log(token)
console.log(decode)