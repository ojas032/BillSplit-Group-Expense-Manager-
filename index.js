const express = require('express')
const app = express()
const User=require('./src/model/User')
const AddFriend=require('./src/model/friend')
const auth=require('./src/middleware/auth')
const UserRouter=require('./src/router/User')
const FriendRouter=require('./src/router/Friend')
const RegularTransactions=require('./src/router/RegularTransactions')
const GroupMappingRouter=require('./src/router/Group')
require('./src/db/mongoose')
const port = 3001


app.use(express.json())
app.use(UserRouter)
app.use(FriendRouter)
app.use(RegularTransactions)
app.use(GroupMappingRouter)

//Create group
app.post('/creategroup',auth,async (req,res)=>{
    try{
        const group=new Group(req.body)
        await group.save()
        res.status(201).send(req.body)
    }
    catch(e){
        req.status(401).send(e)
    }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})