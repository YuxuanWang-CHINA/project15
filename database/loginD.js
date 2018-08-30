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

function LoginDo()
{
    this.loginCheck = function(requ, rcallback)
    {
        mongoose.connect(database_set.dburl,{ useNewUrlParser: true });
        var db = mongoose.connection;

        var Users_model = mongoose.model('users', users_schema);
        Users_model.findOne({ username: requ.username }).select('password').exec().then(
            function(docs)
            {
                rcallback(docs);
                db.close();
            },
            function(erro)
            {
                console.log(erro);
            }
        );
    }
};

module.exports = LoginDo;