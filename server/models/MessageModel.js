const mangoose = require("mongoose")

const MessageSchema = new mangoose.Schema({
    chatId :{
type:String
    },
    senderId: {
        type:String
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},
{
  timestamps:true  
})

const MessageModel = mangoose.model("Message", MessageSchema)

module.exports = MessageModel;