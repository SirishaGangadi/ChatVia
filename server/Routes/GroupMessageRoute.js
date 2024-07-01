const express = require('express')
const GroupMessages = require('../models/GroupMessages')

const router  = express.Router()

router.post('/',async(req,res)=>{
    const{chatId,senderId,text,image}=req.body;
 
    const message = new GroupMessages({
     chatId,
     senderId,
     text,
     image
    })
    try{
     const result = await message.save();
     res.status(200).json(result);
    }
    catch(error){
     res.status(500).json(error);
    }
 })
 router.get('/:gchatId',async (req, res) => {
    const { gchatId } = req.params;
    try {
      const result = await GroupMessages.find({ gchatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  })
 
 module.exports=router;