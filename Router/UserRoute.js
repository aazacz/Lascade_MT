const express           = require('express');
const userRoute         = express();
const multer            = require('multer')
const path          = require('path')
const userController    = require("../Controller/userController")
const auth              = require('../Middleware/authentication') 

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }))
userRoute.use(express.static("public"))   

const Authentication = auth("User")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../Frontend/public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})


const upload = multer({
    storage:storage,
    limits: { fieldSize: 2 * 1024 * 1024 }

})

userRoute.get("/",Authentication)

// userRoute.get("/checkAuth",Authentication,userController.checkAuth);


userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);



module.exports = userRoute