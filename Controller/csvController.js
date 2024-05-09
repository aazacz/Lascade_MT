const express           = require('express');
const Queue             = require("bull")
require("dotenv").config
const {redisPort,redisHost} = process.env;
const path = require("path")
const csvUploadQueue = require('../Processor/csvQueue');


// const csvUploadQueue = new Queue("csvQueue",{
//     redis: {
//         port:redisPort,
//         host:redisHost
//     }
// })

const csvUpload = async(req,res)=>{
    try {
       
        csvUploadQueue.process(path.join(__dirname,"../Processor/csvUploadProcessor"))


        csvUploadQueue.on('completed', (job,result) => {
            // console.log(job);
            console.log(`Job ID ${job.id} completed with result:`, result);
          });

        csvUploadQueue.on('failed', (job, err) => {
            console.error(`Job ID ${job.id} failed with error:`, err);
          });

        // const result = await job.finished();
          res.status(200).send("File is Uploaded");
     

    } catch (error) {
        console.log("Upload error  " +error);
       
      
    }
}



module.exports= {csvUpload}