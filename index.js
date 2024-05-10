const express       = require('express')
const app           = express()
const cors          = require('cors')
const cookieparser  = require('cookie-parser')
require('dotenv').config()
const {userRoute}     = require('./Router/UserRoute');// Import user routes
require("./Config/mongodbServer")                     // Connect to MongoDB


const PORT = process.env.PORT

app.use(cors())// Enable CORS
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/user', userRoute)

// Homepage route
app.get("/",(req,res)=>{
    res.status(200).json({Success:"Welcome, This is the success response for HomePage"})
                        })
 

// Start the server
app.listen(PORT, () => console.log('Server is running on PORT:3000'))