const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

// Registering a new User
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new UserModel({ email, username, password: hashedPassword });
   
    // Save the new user to the database
    await newUser.save();
    res.status(200).json(newUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user

const loginUser = async(req, res)=>{
    const{email, password} =req.body;

    try {
        const user =await UserModel.findOne({email:email})

        if(user){

           const validity = await bcrypt.compare(password,user.password)

           validity ? (res.status(200).json(user)):(res.status(400).json("wrong password"))
        } 
        else{
            res.status(404).json("user does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = registerUser;
module.exports = loginUser;
