/*schema for product page */

const mongoose = require('mongoose')

const schema = mongoose.schema//.schema is a method present in mongoose 

//field user schema
const productSchema = new mongoose.Schema({

    img:{
        type:String,
        required:true
    },
    img1:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)

