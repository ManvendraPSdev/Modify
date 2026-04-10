const mongoose = require("mongoose") ; 

const songSchema = new mongoose.Schema({
    url : {
        type : String ,
        require : [true , "song url is require !!"]
    } , 
    posterUrl : {
        type : String ,
        default : null
    } , 
    title : {
        type : String ,
        require : [true , "Title of the song is required !!"]
    } ,
    mood : {
        type : String ,
        enum : ["sad" , "happy" , "surprised"] , 
        message : "enum this is "
    }
})

const songModel = mongoose.model("songs" , songSchema) ; 

module.exports = songModel ; 