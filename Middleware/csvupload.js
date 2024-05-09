const csvDb             = require("../Model/csvDb")
const Queue             = require("bull")
const multer            = require('multer');
const {redisPort,redisHost} = process.env;
const csv = require("../Processor/csvUploadProcessor")


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

const upload = multer({
    storage:storage,
})


const csvUploadQueue = new Queue("csvQueue",{
    redis: {
        port:redisPort,
        host:redisHost
    }
})



const csvUploadProcessor = async(job,done)=>{
    try {
        upload.single("csvfile")
        
        console.log(job.data);
    
        const jsonArray=await csv().fromFile(job.data.file.path)
                                   .preFileLine((fileLine,idx)=>{
                         if (idx === 0 )
                            { return fileLine.split(" ").join("_").toLowerCase();
    
                            }  
        return fileLine;
        })
        // console.log(jsonArray);
    
        await csvDb.insertMany(jsonArray)       
                    .then(function () {
                        console.log("Successfully saved the datas to DB");    })
                    .catch(function (err) {
                        console.log("err "+err);    });
        // res.json(jsonArray)
        done()
    } catch (error) {
        console.log(error);
    }
        // console.log(job)
        // done()
        // return Promise.resolve(result);
    }
    
    module.exports= csvUploadProcessor