//Server Page....
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')//for importing  of path
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')
const ejs = require('ejs')
const Razorpay = require('razorpay')

//port
const PORT = process.env.port || 3000

//database connection
mongoose.connect("mongodb://localhost:27017/farmfresh",{ useNewUrlParser: true, useUnifiedTopology: true})
    //chain command
    .then(() => console.log("database connected succesfully..."))
    .catch((err) => console.log('database connection failed....',err));
//------------------------------------------------------------------------------------------------------------
//session store of cart
let mongoStore = new MongoDbStore({
    mongoUrl: "mongodb://localhost:27017/farmfresh",
    collection: 'cartSessions'
})     

//session config
app.use(session({
    secret: "123456",
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    Cookie: { maxAge: 3000 } //24hours
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())//tell server we gona use it 
app.use(passport.session())//tell server we gona use it //because we can not use cokie directly

//Global middleware
app.use((req,res,next)=>{//we can not use data directly from backend we need to request server
    res.locals.session = req.session//but in this we give frount end some permition to use this data
    res.locals.user = req.user//same as above 
    next()
})
//--------------------------------------------------------------------------------------------------------------

//assets we use'use' to use the data
app.use(express.static('./public'));//static for path so we can use the data present in public
app.use(express.json({}))//express has two ways to send data json, url encoded
app.use(express.urlencoded({extended: false })) 

//setting up view engine
app.set('views',path.join(__dirname,'/resources/views'))//we connect this folder to view folder useing join
app.set('view engine','ejs')//ejs is type

//setting up routes
require('./routes/web')(app)

/* const User = require('./app/models/user')

 async function insert(){
    let userName = "saurav"
    let email = "Suar@gamil.com"
    let mobile = "8468264"
    let password = "1234"
    let confirmPassword = "1234"

    const user = new User({
        userName,
        email,
        mobile,
        password,
        confirmPassword 
    })

    user.save()
}

insert() */

//server
app.listen(PORT, ()=>{
    console.log('Server is listening on port',PORT)
})

//payment razerpay
var instance = new Razorpay({
    key_id: 'rzp_test_gP8r9l9kO7tgvL',
    key_secret: 'JMQWO2hxA97WO2ayZy2lWqpd',
  });


app.post('/create/orderId', (req, res)=>{
    console.log("create orderid request",req.body);
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderid : order.id});
    });

})

/* verify signature */
app.post("/api/payment/verify", (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'JMQWO2hxA97WO2ayZy2lWqpd')
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response
    if (expectedSignature === req.body.response.razorpay_signature) {
        response = { "signatureIsValid": "false" }
    } else {
        response = { "signatureIsValid": "true" }
    }
    res.send(response);
});
   
   
    