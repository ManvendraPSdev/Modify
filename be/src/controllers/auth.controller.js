const userModel = require("../models/user.model.js") ; 
const bcrypt = require("bcryptjs") ; 
const jwt = require("jsonwebtoken") ; 
const blacklistModel = require("../models/blacklist.model.js");
const redis = require("../config/cache.js");

async function registerController(req , res){
    const {userName , email , password , bio , profileImage} = req.body ; 

    const ifuserAlreadyExists = await userModel.findOne({
        $or : [
            {userName} , 
            {email}
        ]
    }) ; 
    if(ifuserAlreadyExists){
        return res.status(403).json({
            message : "user already exists in the database !!"
        })
    }

    const hash = await bcrypt.hash(password , 10) ; 

    const user = await userModel.create({
        userName , 
        email , 
        password : hash , 
        bio ,
        profileImage
    }) ; 

    const token = jwt.sign({
        id : user._id , 
        email : user.email
    } , process.env.JWTSECRET , {expiresIn : "1d"}) ; 

    res.cookie("token" , token)

    return res.status(200).json({
        message : "user created sucessfully" , 
        user : {
            userName : user.userName , 
            email : user.email ,
            password : user.password , 
            bio : user.bio , 
            profileImage : user.profileImage
        }
    })
}

async function loginController(req , res){
    const {userName , email , password} = req.body ; 
    console.log(req.body) ; 
    const user = await userModel.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    });
    console.log(user) ;
    if(!user){
        return res.status(404).json({
            message: "user not found register !"
        })
    }

    const ispasswordValid = await bcrypt.compare(password , user.password) ; 

    if(!ispasswordValid){
        return res.status(403).json({
            message : "enter the valid password"
        })
    }

    const token = jwt.sign({
        id : user._id , 
        email : user.email
    } , process.env.JWTSECRET , {expiresIn : '1d'}) ; 

    res.cookie("token" , token) ; 

    return res.status(200).json({
        message: "login sucessfull"  ,
        user : {
            userName : user.userName , 
            email : user.email , 
            bio : user.bio , 
            profileImage : user.profileImage
        }
    })


}

async function getMeController(req , res){
    const id = req.user.id ; 
    const user = await userModel.findById(id) ; 
    if(!user){
        return res.status(404).json({
            message : "user not found !!"
        })
    }
    return res.status(201).json({
        message : "user fetched sucessfully" , 
        user : {
            id : user._id ,
            userName : user.userName , 
            email : user.email , 
            bio : user.bio , 
            profileImage : user.profileImage
        }
    })
}

async function logoutController(req , res){
    const token = req.cookies.token ; 
    res.clearCookie("token") ; 
    await redis.set(token , Date.now().toString() , "EX" , 60*60)  ;
    res.status(200).json({
        message : "user logout sucessfully"
    })
}

module.exports = {registerController , loginController , getMeController , logoutController} ; 