const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema({
    userName : {
        type : String ,
        require : [true , "UserName is required"]
    }, 
    email : {
        type : String ,
        unique : [true , "email already exists"] , 
        require : [true ,"email is required"]
    },
    password : {
        type : String ,
        require : [true , "password is required"]
    },
    bio : String ,
    profileImage : {
        type : String ,
        default : "https://res.cloudinary.com/dg7uxga98/image/upload/v1765713574/uploads/1765713571035-newImg.jpg.png"
    }
})

const userModel = mongoose.model("users" , userSchema) ; 

module.exports = userModel ; 
