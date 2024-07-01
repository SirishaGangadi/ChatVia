const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs")

//get  a user 

const getUser = async (req, res)=>{
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
}

const updateUser = async(req, res)=>{
    const id = req.params.id;
    const {currentUserId,currentUserAdminStatus, password }= req.body

    if(id === currentUserId || currentUserAdminStatus){
        try {

            if(password){
                const salt =await bcrypt. genSalt(10);
                req.body.password = await bcrypt.hash (password,salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body,{new:true})
            res.status(200).json(user);
        } catch (error) {
            
        }
    }
    else{
        res.status(403).json("Access Denied! You can only update your own profile")
    }
}

const  deleteUser = async (req, res)=>{
    const id = req.params.id

    const {currentUserId, currentUserAdminStatus}= req.body;

    if(currentUserId === id || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User delete successfully")
        } catch (error) {
           res.status(500).json(error);
        }
    }
}

module.exports=getUser;
module.exports=updateUser;