const express           = require('express');
const Queue             = require("bull")
require("dotenv").config
const {redisPort,redisHost} = process.env;
const path = require("path")

const csvUploadQueue = new Queue("csvQueue",{
    redis: {
        port:redisPort,
        host:redisHost
    }
})

const csvUpload = async(req,res)=>{
    try {
        if(req.file===undefined){
            throw new Error("No file uploaded");
        }
        if(req.file.mimetype !=="application/csv"){
            throw new Error("Wrong File type")
        }
        const { originalname, filename } = req.file;
        const file = req.file
        // const jobId = uuidv4(); // Generate unique job ID
        const uploadUserId = req.userId 
       
        await csvUploadQueue.add({ uploadUserId, originalname, file });
        
        csvUploadQueue.process(path.join(__dirname,"../Processor/csvUploadProcessor"))


        // csvUploadQueue.on('completed', (job, result) => {
        //     console.log(`Job ID ${job.id} completed with result:`, result);
        //   });

        // csvUploadQueue.on('failed', (job, err) => {
        //     console.error(`Job ID ${job.id} failed with error:`, err);
        //   });
        // const result = await job.finished();
          res.status(200).send("result");
        // res.json(jsonArray)

    } catch (error) {
        console.log("Upload error  " +error);
       
        if(error.message=== "Wrong File type"){
            
            return res.status(404).json({Error:"Wrong file type attached, Please upload a CSV File"}) 
        }
        else if(error.message==="No file uploaded"){

            return res.status(404).json({Error:"No File Attached"})
        }
    }
}



module.exports= {csvUpload}