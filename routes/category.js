let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET about page. */
router.get('/', function(req, res, next) {
    try {
        let category = req.query.cat
        DB.categories().then(cats => {
            DB.products(category).then(prods => {
                DB.categoryNameFromURL(category).then(urlname => {
                    res.render('category', { title: urlname, categories: cats , products: prods });
                })
            })
        });
    }
    catch{
        res.render('index', { title: 'HOME' , categories: cats });
    }
    
});

module.exports = router;

console.log("Category router exported.")