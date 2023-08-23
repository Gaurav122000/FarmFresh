//models folder use for makeing schema
const mongoose = require('mongoose')

const schema = mongoose.schema//.schema is a method present in mongoose 

//field user schema
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    /* email: {
        type:String,
        unique: true
    },e */

    mobile: {
        type:String,
        required: true,
        unique: true
    },

    password: {
        type:String,
        required: true
    },

    cpassword: {
        type:String,
        required: true
    }


},{timestamps:true})

module.exports = mongoose.model('User',userSchema)

//json example {key:value} also called dictnory in pithon