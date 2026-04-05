const jwt = require("jsonwebtoken") ; 
const blacklistModel = require("../models/blacklist.model");

async function authUser(req , res , next){
    const token = req.cookies.token 

    if(!token){
        return res.status(404).json({
            message : "Unauthorised acess no token!!"
        })
    }

    const isTokenBlacklisted = await blacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({
            message : "Token is blacklisted"
        })
    }

    let decoded = null ; 

    try {
        decoded = jwt.verify(token , process.env.JWTSECRET) ; 

    } catch (error) {
        return res.status(401).json({
            message : "UnAuthorised acess in decoded !!"
        })
    }

    req.user = {
        id : decoded.id 
    }

    next() ; 
}

module.exports = {authUser }; 