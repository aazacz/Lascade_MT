const mongoose = require("mongoose")

const csvSchema = mongoose.schema(
    {
index: {    type: mongoose.Schema.Types.ObjectId,
            ref: "lascadeUser",
            required: false },
 index:Number,
 customer_id: {
            type: String,
             unique: true  },
 first_name:String,
 last_name:String,
 company:String,
 city: String,
 country: String,
 phone_1: String,
 phone_2: String,
 email: {
    type: String,
    unique: true
},
subscription_date: Date,
website: String

    }
)