const express = require('express')
const cors =require('cors')
require('dotenv').config()
const connectDB =require("./connectDB")
const bodyparser = require("body-parser");


//Router 

const AuthRoute =require("./Routes/AuthRoute");
const UserRouter =require("./Routes/UserRouter");
const ChatRoute = require("./Routes/ChatRoute");
const MessageRoute = require("./Routes/MessageRoute")
const sendOtp = require("./Routes/sendOtp")
const Group = require("./Routes/GroupRoute")
const GroupMessagesRoute = require("./Routes/GroupMessageRoute")



const app =express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true
}))

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.json({
        message :"server runnning at " + PORT
    })
})


// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRouter)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/otp', sendOtp)
app.use('/group',Group ) //changes
app.use('/groupmessages',GroupMessagesRoute )



connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running at : ${PORT}`)
    })
})



