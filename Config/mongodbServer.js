const mongoose = require('mongoose')
 require('dotenv').config()  //env
 const {mongooseConnectionId,mongoosePassword} = process.env;
 const  HitApi = require('../Model/csvDb');

//  const mongoURI = 'mongodb://localhost:27017/Lascade';


//  const connectToMongoDB=mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => { 
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

const password = encodeURIComponent(mongoosePassword); //password URLencoding
//connection Id for Atlas
// const connection = `mongodb+srv://abinbabz01:${password}${mongooseConnectionId}`;

//connection Id for Mongodb Local
const connection =  'mongodb://127.0.0.1:27017/lascade?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5';
 

 

const connectToMongoDB= mongoose.connect(connection,{})
    .then(()=>{
    console.log(`Connected to MongoDB Local`);
}).catch((error)=>{
    console.log(error.message);
    console.log("Not Connected");
})



const models = { HitApi };
module.exports = connectToMongoDB