var mongoose = require('mongoose');
var database_set = require('./database_config');

var Schema = mongoose.Schema;
var users_schema = new Schema(
    {
        username: String,
        password: String
    },
    {
        versionKey: false
    }
);

function UserDo()
{
    this.userGet = function(rcallback)
    {
        mongoose.connect(database_set.dburl,{ useNewUrlParser: true });
        var db = mongoose.connection;

        //console.log('enteruserdo');
        var Users_model = mongoose.model('users', users_schema);
        Users_model.find().exec( ).then(
            function (docs)
            {
                //console.log('findok');
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
        mongoose.connect(database_set.dburl,{ useNewUrlParser: true });
        var db = mongoose.connection;
        
        var Users_model = mongoose.model('users', users_schema);
        var Insert_into = new Users_model({ username: requ.username, password: requ.password });
        Insert_into.save().then(
            function()
            {
                rcallback();
                db.close();
            },
            function(erro)
            {
                console.log(erro)
            }
        );
    };

    this.userDelete = function(requ, rcallback)
    {
        mongoose.connect(database_set.dburl,{ useNewUrlParser: true });
        var db = mongoose.connection;
        
        var Users_model = mongoose.model('users', users_schema);
        Users_model.deleteOne({ username: requ.username }).then(
            function()
            {
                rcallback();
                db.close();
            },
            function(erro)
            {
                console.log(erro);
            }
        )
    }
};

module.exports = UserDo;