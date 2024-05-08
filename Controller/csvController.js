const express = require('express');
const csv = require("csvtojson")

const csvUpload = async(req,res)=>{

    try {
     
        const jsonArray=await csv().fromFile(req.file.path).preFileLine((fileLine,idx)=>{
            if (idx === 0 ){return fileLine.split(" ").join("_").toLowerCase();}
        return fileLine;
        })
        res.json(jsonArray)

    } catch (error) {
        console.log("Upload error" +error);
    }
}



module.exports= {csvUpload}