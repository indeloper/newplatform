module.exports.get = function(req, res) {
    /*if (req.session.username) {
      var auth = true
    } else {
      var auth = false
    }*/
    var games = {index: 'seabattle', name: 'Морской бой'}

    res.render('main', { title: 'Main', games: games });
  }