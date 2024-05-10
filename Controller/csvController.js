require("dotenv").config(); 
const path = require("path");
const csvUploadQueue = require('../Processor/csvQueue'); 


// Function for handling CSV uploads
const csvUpload = async (req, res) => {
    try {
        // Process the CSV upload queue using the specified processor
        csvUploadQueue.process(path.join(__dirname, "../Processor/csvUploadProcessor"));

        // Event listeners for when jobs are completed or failed
        csvUploadQueue.on('completed', (job, result) => {
            console.log(`Job ID ${job.id} completed with result:`, result);
        });

        csvUploadQueue.on('failed', (job, err) => {
            console.error(`Job ID ${job.id} failed with error:`, err);
        });

        // Respond with success message if no errors occurred
        res.status(200).send("File is Uploaded");

    } catch (error) {
        // Handle errors that occur during upload process
        console.log("Upload error: " + error);
    }
}


module.exports = { csvUpload };
