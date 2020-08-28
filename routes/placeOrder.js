let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB');

/* POST login */
router.post('/', (req, res) => {

    let username = req.body.un_field
    let password = req.body.pw_field
    let token = req.body.token
    
    ADMIN.login(username, password, token).then(login => {
        DB.categories().then(cats => {

            if(login){
                res.render('admin/admin', { title:"ADMIN", categories: cats });
            }
            else {
                res.render('admin/login', { title:"LOGIN", categories: cats, incorrect: "Incorrect username or password.<br><br>" })
            }

        })
    });
})

module.exports = router;

console.log("Orders router exported.")