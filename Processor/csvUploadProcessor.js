const express           = require('express');
const csv               = require("csvtojson")
const csvDb             = require("../Model/csvDb")
const mongoose          = require('mongoose')
const mongoURI          = 'mongodb://localhost:27017/Lascade';



const csvUploadProcessor = async (job,done)=>{
try {

 //  checking if there exists a file   
    if (!job || !job.data || !job.data.file || !job.data.file.path) {
        throw new Error("Invalid job data: File path not provided");
    }

//  converting the csv datas to JSON object    
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

//connecting mongoose for each processess
    const connectToMongoDB=await mongoose.connect(mongoURI, {})
      .then(() => { 
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
      });


//  inserting the JSON datas from the CSV to mongoDb
    const dbupload = await csvDb.insertMany(jsonArray)       
                .then(function () {
                    console.log("Successfully saved the datas to DB");    })
                .catch(function (err) {
                    console.log("DB insertion error:", err);
                    throw new Error('Failed to insert data into database');   });

        job.progress(100)
        await mongoose.disconnect();
         done()
//  after inserting disconnect the mongoServ         
        return Promise.resolve({dbupload});
} catch (error) {
    console.error("Error processing CSV upload job:", error);
    throw new Error("Failed to process CSV upload job");

}
}

module.exports= csvUploadProcessor