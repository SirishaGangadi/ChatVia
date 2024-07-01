const mangoose = require("mongoose")

const ChatSchema = new mangoose.Schema({
    members:{
        type:Array,   
    },
},{
    timestamps:true
});

const ChatModel = mangoose.model("Chat", ChatSchema);

module.exports = ChatModel;