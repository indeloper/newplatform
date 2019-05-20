const express = require('express');
const router = express.Router();

const api = require('../controllers/api');
const main = require('../controllers/main');

/*module.exports = (app) => {
    noteRoutes(app);
}*/
router.get('/', main.get);

router.get('/api/:gid/:pid', api.get);
router.post('/api', api.post);
router.delete('/api/:gid/:pid', api.delete);
router.put('/api/:gid/:pid', api.put);

module.exports = router;