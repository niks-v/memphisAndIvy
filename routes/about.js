let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET about page. */
router.get('/', function(req, res, next) {
    DB.categories().then(cats => {
        res.render('about', { title: 'ABOUT' , categories: cats });
    });
});

module.exports = router;

console.log("About router exported.")