const mongoose = require("mongoose") ; 

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String , 
        require : [true , "token is required for putting in blacklist"]
    }
},{
    timestamps : true
}) ; 

const blacklistModel = mongoose.model("blacklistTokens" , blacklistTokenSchema) ; 

module.exports = blacklistModel ; 