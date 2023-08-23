/* routes for home, login, register, product */
const homeController = require('../app/http/controllers/home/homecontroller')
const authController = require('../app/http/controllers/auth/authcontroller')
const productController = require('../app/http/controllers/product/productcontroller')
const categoryController = require('../app/http/controllers/categorie/categoriecontroller')
const passport = require('passport')

function initRoutes(app){

    app.get('/',homeController().home)

    //this path for login & register
    app.get('/register',authController().register)
    app.post('/register',authController().postregister)

    app.get('/login',authController().login)
    app.post('/login',authController().postlogin)

    //for logout
    app.get('/logout',authController().logout)

    //for cart
    app.get('/cart', (req,res)=>{
        return res.render('cart')
    })

    //for update cart
    app.post('/update-cart',(req,res)=>{
        //console.log(req.session.passport)
        console.log(req.body)
        if(!req.session.cart){
            req.session.cart = {
                items:{},
                totalQty : 0,
                totalPrice :0
            }
        }
        let cart = req.session.cart
        
        //check if item does not exist in cart

        if(!cart.items[req.body._id]){

            cart.items[req.body._id] = {
                item : req.body,
                qty : 1,
            }

            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = Number(cart.totalPrice) + Number(req.body.price)
        }else{
            cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = Number(cart.totalPrice) + Number(req.body.price)
        }
        return res.json({ totalQty : req.session.cart.totalQty})
    })

    //For Search
    app.post('/search/query',productController().searchQuery)

    //for dairy
    app.get('/category/dairy/get',categoryController().searchProduct)

    app.post('/category/dairy',categoryController().searchProduct)

    //for fruits
    app.get('/category/fruits/get',categoryController().searchProduct)

    app.post('/category/fruits',categoryController().searchProduct)

    //for veg
    app.get('/category/veg/get',categoryController().searchProduct)

    app.post('/category/veg',categoryController().searchProduct)

    //for non-veg
    app.get('/category/non-veg/get',categoryController().searchProduct)

    app.post('/category/non-veg',categoryController().searchProduct)

    //for item
    app.get('/category/product/item',categoryController().productItem)
}

module.exports = initRoutes;