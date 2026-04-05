const express = require("express") ; 
const { registerController, loginController, getMeController, logoutController } = require("../controllers/auth.controller");
const identifyUser = require("../middleware/auth.middleware.js");
const authRouter = express.Router() ; 

authRouter.post("/register" , registerController) ; 
authRouter.post("/login" , loginController) ; 
authRouter.get("/getMe" , identifyUser.authUser , getMeController)
authRouter.post("/logout" , logoutController)

module.exports = authRouter ; 