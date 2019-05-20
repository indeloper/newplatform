module.exports.get = (req, res) => {
    var user = req.session.username;
    res.render('signin', { user: user});
}

module.exports.post = (req, res) => {
    req.session.user = req.body.user;
    res.render('signin', { user: req.session.user});
}