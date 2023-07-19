const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                return bcrypt.compare(password, user.password);
            } else {
                console.log('Invalid username');
            }
        })
        .then(same => {
            if (same) {
                req.session.userId = user._id; //assign ID to the user session - to know when user logged in
                res.redirect('/');
            } else {
                console.log('Invalid password');
                 res.redirect('/auth/login');
             }
        })
        .catch(error => {
            console.log(error);
            res.redirect('/auth/login');
        });
};
