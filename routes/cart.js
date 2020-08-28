let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET about page. */
router.get('/', function(req, res, next) {
    let cartArray = req.query.cart.split("|")
    DB.categories().then(cats => {
        DB.productsFromPIDList(cartArray).then(prods => {
            res.render('cart', { title: 'CART' , categories: cats , products: prods });
        });
    });
});

module.exports = router;

console.log("Cart router exported.")