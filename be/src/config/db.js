const mongoose = require("mongoose") ; 

async function connectToDB(){
    await mongoose.connect(process.env.MONGOURI) ; 
    console.log("Connect to DB") ; 
}

module.exports = connectToDB ; 
