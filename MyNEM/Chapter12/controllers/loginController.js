// module.exports = (req, res) => {
//     res.render('login')
// }

module.exports = (req, res) => {
    res.render('login', {
        errors: req.flash('error'),
    });
};