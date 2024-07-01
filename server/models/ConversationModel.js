const mangoose = require("mongoose")


const messageSchema =new mangoose.Schema({
    text :{
        type :String,
        default :""
    },
    imageUrl :{
        type : String,
        default :""
    },
    videoUrl :{
        type : String,
        default :""
    },
    seen : {
        type : Boolean,
        default :false
    }
}, {
    timestamps :true
})

const  conversationSchema =  new mangoose.Schema({
    sender :{
        type : mangoose.Schema.ObjectId,
        required :true,
        ref :'User'
    },
    receiver :{
        type: mangoose.Schema.ObjectId,
        required :true,
        ref :'User'

    },
    messages : [
        {
            type: mangoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
},
{
    timestamps:true
})

const  MessageModel = mangoose.model('Message',messageSchema)

const ConversationModel = mangoose.model('Conversation' ,conversationSchema)

module.exports ={
    MessageModel,
    ConversationModel
}