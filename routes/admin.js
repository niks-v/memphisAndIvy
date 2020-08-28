let express = require('express');
let router = express.Router();
let DB = require('./database_handling/askDB');
let ADMIN = require('./admin/manage_admin');
let cookieParser = require('cookie-parser');

/* Admin pages. */
router.get('/:page', function(req, res, next) {

    ADMIN.loggedIn(cookieParser.JSONCookies(req.cookies).token).then(response =>{
        console.log(response[1])

        DB.categories().then(cats => {

            if(Boolean(req.params.page)){

                if(response[0]){
                    res.render('admin/'+req.params.page, { title: req.params.page.toUpperCase(), categories: cats, token: response[1] });
                }else {
                    res.render('admin/login', { title:"LOGIN", categories: cats });
                }

            }else {
                res.render('admin/login', { title:"LOGIN", categories: cats });
            }

        });

    }).catch(() => {
        DB.categories().then(cats => {
            res.render('admin/login', { title:"LOGIN", categories: cats });
        });
    })
});


/* POST login */
router.post('/submit-login', (req, res) => {

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

console.log("Admin router exported.")