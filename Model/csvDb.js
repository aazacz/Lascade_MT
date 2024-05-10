const mongoose = require("mongoose")

const csvSchema = mongoose.Schema(
    {
 index:Number,
 customer_id: {
            type: String,
             },
 first_name:String,
 last_name:String,
 company:String,
 city: String,
 country: String,
 phone_1: String,
 phone_2: String,
 email: {
    type: String,
   
},
subscription_date: Date,
website: String

    }
)

const csvCustomerSchema = new mongoose.model("csvCustomerSchema",csvSchema)
module.exports=csvCustomerSchema