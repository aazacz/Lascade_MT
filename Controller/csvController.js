const express           = require('express');
const csv               = require("csvtojson")
const csvDb             = require("../Model/csvDb")
const Queue             = require("bull")
require("dotenv").config
const {redisPort,redisHost} = process.env;
const { v4: uuidv4 }    = require('uuid');
const path = require("path")
// const csv = require("../Processor/csvUploadProcessor")

const csvUploadQueue = new Queue("csvQueue",{
    redis: {
        port:redisPort,
        host:redisHost
    }
})

const csvUpload = async(req,res)=>{
    try {
     
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
        console.log("Upload error" +error);
    }
}



module.exports= {csvUpload}