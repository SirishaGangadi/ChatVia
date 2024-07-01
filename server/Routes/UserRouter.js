const express =require("express");
const getUser =require("../Controller/UserController");
const updateUser = require("../Controller/UserController");
const UserModel = require("../models/UserModel");


const router =express.Router();

router.get('/:id', async (req, res)=>{
    const id = req.params.id;

    try {
         const user = await UserModel.findById(id)

         if(user){

            const {password,...otherDetails}= user._doc;

            res.status(200).json(otherDetails)
         }
         else{
            res.status(404).json("No such user Exists");
         }
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/', async (req, res)=>{
   
    try {
         const user = await UserModel.find()

            res.status(200).json(user)
 
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',updateUser)

module.exports =router;

