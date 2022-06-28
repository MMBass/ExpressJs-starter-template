var express = require('express');
var router = express.Router();

const infoController  = require('../controllers/second.controller');

router.get('/', secondController.getInfo);

module.exports = router;