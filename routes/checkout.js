let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET checkout page. */
router.get('/', function(req, res, next) {
    let cartArray = req.query.cart.split("|")
    DB.categories().then(cats => {
        DB.productPriceTotal(cartArray).then(prods => {
            console.log("prods:",prods)
            res.render('checkout', { title: 'CHECKOUT' , categories: cats, prods: prods });
        });
    });
});

module.exports = router;

console.log("Checkout router exported.")