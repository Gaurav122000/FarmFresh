const Product = require('../../../models/product')

function productController(){
    return {
            product(req, res){
               /* console.log(req.query.q) q is data send by home page category */
               return res.render('product/dairy')
            },
            async productMilk(req, res){
                const data = await Product.find({tag:req.query.q})

                if(data){
                    /* return res.json({item:data}) */
                    return res.render('item/item',{items:data})
                }else{
                    console.log("no data found withn"+ req.query.q + "tag")
                }
            },
            async searchQuery(req, res) {
                /* console.log(req.body.query) */
                const data = await Product.find({$or : [{tag :{ '$regex' : req.body.query}}, {category :{ '$regex' : req.body.query}}, {title :{ '$regex' : req.body.query}} ]})
                /* console.log(data) */
                return res.render('searchres',{items:data})
            }
        }
    }   

module.exports = productController;