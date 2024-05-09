const express           = require('express');
const userRoute         = express();
const userController    = require("../Controller/userController")
const csvController     = require("../Controller/csvController")
const auth              = require('../Middleware/authentication') 
require("dotenv").config
const uploadFile = require("../Middleware/multerUpload")





userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }))
userRoute.use(express.static("public"))   

const Authentication = auth("User")











userRoute.get("/upload",Authentication,userController.checkAuth)
userRoute.post("/upload",Authentication,uploadFile,csvController.csvUpload)

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

 

module.exports = {userRoute }