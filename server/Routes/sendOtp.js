const express =require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");
require('dotenv').config()


const router =express.Router();


// email config
const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: '19f91a0590@gmail.com',
        pass: 'jdrd ugxu edzg dxln'
        
    } 
})

router.post("/sendotp",async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }
      
    try {
        const presuer = await UserModel.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });

            if(existEmail){
                const updateData = await userotp.findByIdAndUpdate({_id:existEmail._id},{
                    otp: OTP
                },{new: true}
            );
            await updateData.save();

            const mailOptions = {
                from: '19f91a0590@gmail.com',
                to: email,
                subject: "Sending Eamil For Otp Validation",
                text: `OTP:- ${OTP}`
            }

            tarnsporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(400).json({ error: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(200).json({ message: "Email sent Successfully" })
                }
            })

            }
            else{
                const saveOtpData = new userotp({
                    email,otp:OTP
                });

                await saveOtpData.save();

                const mailOptions = {
                    from: 'beaulahgrace2001@gmail.com',
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        }
        else{
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }

    } catch (error) {
        
        res.status(400).json({ error: "Invalid Details", error })
    }

});

router.post("/verify-otp",async (req, res) => {

    const {email,otp} = req.body;
    console.log(email,otp)

    if(!otp || !email){
        res.status(400).json({ error: "Please Enter Your OTP and email " })
    }

    try {
        const otpverification = await userotp.findOne({email:email});

        if(otpverification.otp === otp){
            const preuser = await UserModel.findOne({email:email});
            console.log(preuser)

            // token generate
            
           res.status(200).json(preuser);

        }else{
            res.status(400).json({error:"Invalid Otp"})
        }
        console.log("verfied successfully...")
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

})

module.exports=router;

