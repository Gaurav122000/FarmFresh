/* backend of register and login */
const { response } = require("express")
const User = require("../../../models/user")
const passport = require('passport')
const res = require("express/lib/response")

function authController(){
    return {
        register(req,res) {
            res.render('auth/register')
        },
        login(req,res){
            res.render('auth/login')
        },
        async postlogin(req, res,next){/* we use async if await was call in function */
            const {mobile,password} = req.body
            if(!mobile || !password){
                /* return res.json({empty:true}) */
                return res.redirect('/login')
            }
            passport.authenticate('local', (err,user,info)=>{
                if(err){
                    console.log('error occured')
                    return res.json({mismatch:info.message})
                }
                if(!user){
                    console.log('User not found')
                    return res.json({noexist:true})
                }
                req.logIn(user,(err)=>{
                    if(err){
                        return next(err)
                    }
                    /* console.log("login",user) *///for login console
                    console.log("login",user.firstName)
                    return res.json({success:true})
                })
            })(req,res,next)
        },
        async postregister(req, res){
            //this for storing data from front end so we can check it 
            //other way to enter it = const fname = req.body.fname
            const {fname,lname,mobile,/* email,e */password,cpassword} = req.body
            if(!fname || !lname || !mobile || !password || !cpassword){
                return res.json({error:true})
            }
            const mobileExist = await User.findOne({mobile:mobile})/* use to check if mobile no exist */
            if(mobileExist){
                return res.json({mobile:"This number already exist"})
            }
            if(password != cpassword){
                return res.json({mismatch:"Password are not matching"})
            }
            const user = new User({
                firstName: fname,
                lastName: lname,
                /* email: email,e */
                mobile: mobile,
                password: password,
                cpassword: cpassword
            })
            const saved = await user.save()
            return res.json({success:true})
            /* if(!email){
                const user = new User({
                    firstName: fname,
                    lastName: lname,
                    mobile: mobile,
                    password: password,
                    cpassword: cpassword
                })

                const saved = await user.save()
                return res.json({success:true})
            }else{
                const user = new User({
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    mobile: mobile,
                    password: password,
                    cpassword: cpassword
                }) 

                const saved = await user.save()
                return res.json({success:true})
            } e*/
            
            
        },
        logout(req,res){
            console.log("logging out sucessfull")
            req.logout()
            return res.redirect('/')
        }
    }
}

module.exports = authController;