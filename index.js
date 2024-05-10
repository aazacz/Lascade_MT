const express = require('express')
const app = express()
const cors = require('cors')
const cookieparser = require('cookie-parser')
require('dotenv').config()
const PORT = process.env.PORT
const {userRoute}     = require('./Router/UserRoute');
// const connectToMongoDB = require("./Config/mongodbServer");
require("./Config/mongodbServer")
// connectToMongoDB()
app.use(cors())
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoute)

app.get("/",(req,res)=>{
    res.status(200).json({Success:"Welcome, This is the success response for HomePage",
                        
                            })
})
 

app.listen(PORT, () => console.log('Server is running on PORT:3000'))