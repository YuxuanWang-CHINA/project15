var bcrypt = require('bcrypt');
const saltRounds = 12;

function createPassword(myPlaintextPassword, rcallback)
{
    bcrypt.hash(myPlaintextPassword, saltRounds).then(
        function(hash)
        {
            rcallback(hash);
        }
    );
};

function checkPassword(inputPassword, bcryptPassword, rcallback)
{
    bcrypt.compare(inputPassword, bcryptPassword).then(
        function(res) {
            rcallback(res);
    }
);
};

exports.createPassword = createPassword;
exports.checkPassword = checkPassword;