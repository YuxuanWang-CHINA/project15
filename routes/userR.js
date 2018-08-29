var express = require('express');
var user_router = express.Router();
var bodyParser = require('body-parser');
var User_d = require('../database/userD');
var User_doing = new User_d();

user_router.use(bodyParser.json());
user_router.route('/')
    .get(
        function(req, res, next)
        {
            User_doing.userGet(
                function(docs)
                {
                    res.set('Connection', 'close');
                    res.set('Content-Type', 'application/json');
                    res.send(JSON.stringify(docs));
                    next();
                }
            );
        }
    )
    .post(
        function(req, res, next)
        {
            var Password_hash = require('../something/passwordS');
            Password_hash.createPassword(req.body.password, 
            function(hash)
            {
                req.body.password = hash;
            }
        );
            next();
        }
    )
    .post(
        function(req, res, next)
        {
            User_doing.userPost(req.body,
                function()
                {
                    res.send('ok');
                    next();
                }
            );
        }
    )
    .delete(
        function(req, res, next)
        {
            User_doing.userDelete(req.body,
                function()
                {
                    res.send('OKK');
                    next();
                }
            )
        }
    )
    .all(
        function(req, res)
        {
            //res.end();
            console.log('234');
        }
    );
user_router.get('/haha', function(req,res){res.send('af')});

module.exports = user_router;