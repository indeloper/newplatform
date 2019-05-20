const express = require('express');
const router = express.Router();

const api = require('../controllers/api');
const main = require('../controllers/main');
const signin = require('../controllers/signin');
const logout = require('../controllers/logout');
// const signup = require('../controllers/signup');

// GET
router.get('/', main.get);
// router.get('/signup', signup.get);
router.get('/signin', signin.get);
router.get('/logout', logout)

// POST
// router.post('/signup', signup.post);
router.post('/signin', signin.post);

// API
router.get('/api/:gid/:pid', api.get);
router.post('/api', api.post);
router.delete('/api/:gid/:pid', api.delete);
router.put('/api/:gid/:pid', api.put);

module.exports = router;