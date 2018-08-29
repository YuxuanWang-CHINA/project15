var mongoose = require('mongoose');
var database_set = require('./database_config');

mongoose.connect(database_set.dburl,{ useNewUrlParser: true });
var db = mongoose.connection;

var Schema = mongoose.Schema;
var users_schema = new Schema(
    {
        username: String,
        password: String
    }
);

function UserDo()
{
    this.userGet = function(rcallback)
    {
        var Users_model = mongoose.model('users', users_schema);
        Users_model.find().then(
            function (docs)
            {
                rcallback(docs);
                db.close();
            },
            function(erro)
            {
                console.log(erro);
            }
        );
    };

    this.userPost = function(requ, rcallback)
    {
        var Users_model = mongoose.model('users', users_schema);
        var Insert_into = new Users_model({ username: requ.username, password: requ.password });
        Insert_into.save().then(
            function()
            {
                rcallback();
            },
            function(erro)
            {
                console.log(erro)
            }
        );
    };

    this.userDelete = function(requ, rcallback)
    {
        var Users_model = mongoose.model('users', users_schema);
        Users_model.deleteOne({ username: requ.username }).then(
            function()
            {
                rcallback();
            },
            function(erro)
            {
                console.log(erro);
            }
        )
    }
};

module.exports = UserDo;