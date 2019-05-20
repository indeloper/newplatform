var express = require('express');
var router = express.Router();
/*pages*/
var main = require('../controllers/main');

router.get('/', main.get);

module.exports = router;