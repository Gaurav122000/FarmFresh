const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

function init(passport){
    passport.use(new LocalStrategy({usernameField:'mobile'},async (mobile,password,done)=>{
        //if email exist
        const user = await User.findOne({mobile:mobile})
        //console.log(user)
        if(!user){
            console.log("in passport.js user not found")
            return done(null,false)
        }

        if(password == user.password){
            return done(null,user)
        }
        else{
            return done(null,false,{message:'Invalid Credential'})
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)//storing user id in session
    })

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}
module.exports = init

