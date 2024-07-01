const express =require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
// const registerUser = require("../Controller/AuthController");
const loginUser = require("../Controller/AuthController");

const router =express.Router();

// router.post('/register', async (req, res) => {
//     const { email, username, password } = req.body;
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       const newUser = new UserModel({ email, username, password: hashedPassword });
//       console.log(newUser.email)
//       await newUser.save();
//       res.status(200).json(newUser);
//       console.log("user save api called")
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });


  
router.post("/register", async (req, res) => {

  let checked
  try {
      checked = await UserModel.findOne({ email: req.body.email })
      console.log(req.body.email)
     

  } catch (err) {
      console.log(err.message)
  }
  if (checked) {
      return res.status(400).send({ message: 'User already exists' });
  } else {

      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds)
          .then(async hashedPassword => {
              console.log('Hashed password:', hashedPassword);
              console.log("image",req.body.image);
              const postData = await UserModel.create({
                  email: req.body.email,
                  username: req.body.username,
                  password: hashedPassword,
                  image:req.body.image
                  
              });
              if (!postData) {
                  return res.status(400).send({ message: 'User Not Saved' });
              }
              console.log(postData, 'from postdata')
              return res.status(200).json({message: "Registration Success", data: postData})
              
          })
          .catch(err => {
              console.error('Error hashing password:', err);
              return res.status(400).send({ message: 'password encryption failed' });
          });
  }
})


router.post('/login', loginUser);


module.exports = router;