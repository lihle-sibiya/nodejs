module.exports = (req, res) => {
    if (req.session.userId) { //check if session has user ID
        return res.render('create'); //if it does have user id then show create blog post page
    } else {
        res.redirect('/auth/login');
    }
};