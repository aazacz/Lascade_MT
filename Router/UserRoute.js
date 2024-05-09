const express           = require('express');
const userRoute         = express();
const path              = require('path')
const userController    = require("../Controller/userController")
const csvController     = require("../Controller/csvController")
const auth              = require('../Middleware/authentication') 
const multer            = require('multer');
require("dotenv").config


userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }))
userRoute.use(express.static("public"))   

const Authentication = auth("User")


/*Multer configuration*/
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        let name = file.originalname.split(" ").join("_").toLowerCase()
        cb(null,name)

    }
})

const upload = multer({
    storage:storage,
})



/*################   ROUTES   ################*/
// userRoute.get("/",Authentication)
// userRoute.get("/checkAuth",Authentication,userController.checkAuth);

userRoute.get("/upload",Authentication,userController.checkAuth)
userRoute.post("/upload",Authentication,upload.single("csvfile"),csvController.csvUpload)

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

 

module.exports = userRoute