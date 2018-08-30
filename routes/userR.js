var express = require('express');
var user_router = express.Router();
var bodyParser = require('body-parser');
var User_d = require('../database/userD');
var User_doing = new User_d();

user_router.use(bodyParser.json());
user_router.route('/')
    .all(
        function(req, res, next)
        {
            //console.log('start');
            next();
        }
    )
    .get(
        function(req, res, next)
        {
            //console.log('enterget');
            User_doing.userGet(
                function(docs)
                {
                    //console.log('callbackok');
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
                next();
            }
        );
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
            //console.log('end');
        }
    );

module.exports = user_router;