var express = require('express');
var app = express();

var user_route = require('./routes/userR');
app.use('/user', user_route);
var login_route = require('./routes/loginR');
app.use('/login', login_route);
app.listen(3000);