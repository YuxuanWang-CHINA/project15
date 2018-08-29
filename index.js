var express = require('express');
var app = express();

var user_route = require('./routes/userR');
app.use('/user', user_route);
app.listen(3000);