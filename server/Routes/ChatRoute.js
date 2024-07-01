const express = require('express');
const ChatModel = require("../models/ChatModel");

const router = express.Router();

router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
  
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    
    const newChat = new ChatModel({
      members: [senderId, receiverId]
    });

    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] }
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:firstId/:secondId", async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] }
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
