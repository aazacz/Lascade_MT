const mongoose = require("mongoose")

const csvSchema = mongoose.schema(
    {
userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lascadeUser",
            required: false },
 index:Number,
 customerId: {
            type: String,
             unique: true  },
 FirstName:String,
 LastName:String,
 Company:String,
 city: String,
 country: String,
 phone1: String,
 phone2: String,
 email: {
    type: String,
    unique: true
},
subscriptionDate: Date,
website: String

    }
)