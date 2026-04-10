const express = require('express') ;
const upload = require("../middleware/upload.middleware.js") ; 
const songController = require('../controllers/song.controller.js');

const songRouter = express.Router() ; 

songRouter.post("/" , upload.single("song") , songController.uploadSongController) ;
songRouter.get("/" , songController.getSong)

module.exports = songRouter ; 