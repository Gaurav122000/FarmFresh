const Product = require('../../../models/product')
function categoryController(){
    return{
        /* for product */
        async searchProduct(req, res) {
            /* console.log(req.body.query) */
            const data = await Product.find({$or : [{category :{"$regex" : req.query.q}}]})
            /* console.log(data) */
            return res.render('product/product',{items:data})
        },
        /* for item */
        async productItem(req, res) {
            /* console.log(req.query.q) */
            const data = await Product.find({title :req.query.q})
            /* console.log(data) */
            return res.render('item/item',{items:data})
        }
    }
}
module.exports = categoryController;