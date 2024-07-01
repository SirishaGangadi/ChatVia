const express = require('express');
const Group = require("../models/GroupModel")

const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const group = new Group(req.body);
    await group.save();
    res.status(200).json(group);
    console.log("group save api called")

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
    
  });

  router.get('/:id', async (req, res) => {
    try{
        const group = await Group.findById(req.params.id);
        res.status(200).json(group)
    }
    catch(error){
        res.status(500).json(error)
    }
    
  });

  router.get('/', async (req, res) => {
    try{
        const group = await Group.find();
        console.log(group)
        res.status(200).json(group)
    }
    catch(error){
        res.status(500).json(error)
    }
    
  });


  module.exports = router;