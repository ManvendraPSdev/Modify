const cors = require("cors") ; 
const express = require("express") ; 
const cookieParser = require("cookie-parser") ; 
const app = express() ; 

app.use(express.json()) ; 
app.use(cookieParser()) ; 
app.use(cors({
    origin : "http://localhost:5173" , 
    credentials : true
}))

const authRouter = require("./routes/auth.routes.js") ; 
const songRouter = require("./routes/song.routes.js") ; 

app.use("/api/auth" , authRouter) ; 
app.use("/api/song" , songRouter) ; 

module.exports = app ; 
