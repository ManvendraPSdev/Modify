require("dotenv").config() ; 
const app = require("./src/app.js");  
const connectToDB = require("./src/config/db.js") ; 

const PORT = process.env.PORT ; 
connectToDB() ; 
app.listen(PORT , ()=>{
    console.log(`server is running on PORT ${PORT}`) ; 
})