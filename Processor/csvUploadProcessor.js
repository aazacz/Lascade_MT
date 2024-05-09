const express           = require('express');
const csv               = require("csvtojson")
const csvDb             = require("../Model/csvDb")
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/Lascade';



const csvUploadProcessor = async (job,done)=>{
try {
    console.log(job);
    // console.log(done)

    const jsonArray=await csv().fromFile(job.data.file.path)
                               .preFileLine((fileLine,idx)=>{
                     if (idx === 0 )
                        { return fileLine
                            .split(" ")
                            .join("_")
                            .toLowerCase();

                        }  
    return fileLine;
    })
    job.progress(80)

 const connectToMongoDB=await mongoose.connect(mongoURI, {})
      .then(() => { 
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
      });

 const dbupload = await csvDb.insertMany(jsonArray)       
                .then(function () {
                    console.log("Successfully saved the datas to DB");    })
                .catch(function (err) {
                    console.log("err "+err);    });
job.progress(100)
// done()
connectToMongoDB.close();
return Promise.resolve({dbupload});
} catch (error) {
    console.error("Error processing CSV upload job:", error);
    throw new Error("Failed to process CSV upload job");

}
}

module.exports= csvUploadProcessor