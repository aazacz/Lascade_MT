const multer            = require('multer');
require("dotenv").config
const csvUploadQueue = require('../Processor/csvQueue');



/*Multer configuration*/
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        let name = file.originalname.split(" ").join("_").toLowerCase()
        cb(null,name)
        
    }
})



//Multer function
const  uploadFile = (req, res, next)=> {
    const upload = multer({ storage:storage}).single('csvfile');

    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log("err " + err);

            if(err.message === "Unexpected field"){
               return res.status(400).json({Error:"Please check the uploaded file, Upload one file only"})
            }
                     
        } 
        
        if(req.file===undefined){
           return res.status(409).json({Error:"No file uploaded"})
        }

        if(req.file.mimetype !=="text/csv"){
            // throw new Error("Wrong File type")
           return res.status(409).json({Error:"Wrong File type"})
        }

        const { originalname } = req.file;
        const file = req.file
        const uploadUserId = req.userId 
        // console.log(originalname,file,uploadUserId);

        await csvUploadQueue.add({ uploadUserId, originalname, file, },{
            attempts: 4, //  retry attempts
            backoff: {
                type: 'exponential', // Exponential backoff strategy
                delay: 1500, // Delay between retries
            },
        })


        next()
    })
}

module.exports = uploadFile

