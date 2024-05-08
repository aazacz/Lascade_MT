const mongoose = require("mongoose");

const LascadeUserSchema =  mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password: {
        type: String,
        required: true
    },
    csvdata:{
        type:Boolean,
        
    },
    authenticated:{
        type:Boolean,
        default:false
    }
   
   

})


   
const LascadeUser = new mongoose.model("lascadeUser",LascadeUserSchema);
module.exports = LascadeUser;