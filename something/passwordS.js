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

exports.createPassword = createPassword;