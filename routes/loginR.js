var express = require('express');
var login_router = express.Router();
var bodyParser = require('body-parser');
var Login_d = require('../database/loginD');
var Login_doing = new Login_d();

login_router.use(bodyParser.json());
login_router.route('/')
    .post(
        function(req, res)
        {
            var inputPasswords = req.body.password;
            Login_doing.loginCheck(req.body,
                function(docs)
                {
                    var phash = docs.password;
                    var Password_hash = require('../something/passwordS');
                    Password_hash.checkPassword(inputPasswords, phash,
                        function(results)
                        {
                            console.log(results);
                            res.send(results);
                        }
                    );
                }
            )

        }
    );

module.exports = login_router;