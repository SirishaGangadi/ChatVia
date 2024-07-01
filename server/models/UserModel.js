const mangoose = require("mongoose")

const userSchema = new mangoose.Schema({
    
    email :{
        type: String,
        required :[true, " provide email"],
        unique :true
    },
    username: {
        type : String,
        required:[true, "provide Username"]

    },
    
    password :{
        type: String,
        required :[true, " provide password"],
        
    },
    image :{
        type: String,
       
        
    },
}
,{
    timestamps :true
}
)

const UserModel =mangoose.model('User', userSchema)

module.exports = UserModel;

