let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET about page. */
router.get('/', function(req, res, next) {
    DB.categories().then(cats => {
        DB.productFromPID(req.query.prod).then(prods => {
            res.render('product', { title: prods.Display, categories: cats, product: prods });
        })
    });
});

module.exports = router;

console.log("Product router exported.")