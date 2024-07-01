const mongoose = require("mongoose")

const GroupMessagesSchema = new mongoose.Schema({
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
  });

  const GroupMessages = mongoose.model('Groupmessage', GroupMessagesSchema);

  module.exports = GroupMessages;