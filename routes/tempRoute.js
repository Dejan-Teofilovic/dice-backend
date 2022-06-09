const express = require('express');
const router = express.Router();
const { tempFunction } = require('../controllers/tempController');

router.get('/tempFunction', tempFunction);

module.exports = router;