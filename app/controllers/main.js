module.exports.get = (req, res) => {
    /*if (req.session.username) {
      var auth = true
    } else {
      var auth = false
    }*/
    var games = {index: 'seabattle', name: 'Морской бой'}

    res.render('index', { title: 'Main', games: games });
  }