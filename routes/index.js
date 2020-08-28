let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  DB.categories().then(cats => {
    res.render('index', { title: 'HOME' , categories: cats});
  })
});

module.exports = router;

console.log("Index router exported.")