const mongoose = require('mongoose')
 require('dotenv').config()  //env
 const {mongooseConnectionId,mongoosePassword} = process.env;

const password = encodeURIComponent(mongoosePassword); //password URLencoding
const connection = `mongodb+srv://abinbabz01:${password}${mongooseConnectionId}`;



const connectToMongoDB = async () => {
    await mongoose.connect(connection,{
   
   

}).then(()=>{
    console.log(`Connected to MongoDB Atlas`);
}).catch((error)=>{
    console.log(error.message);
    console.log("Not Connected");
})

};  


module.exports = connectToMongoDB