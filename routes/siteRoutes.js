const express = require('express');
const router = express.Router();
const { saveOrder } = require('../controllers/siteController');

router.post('/saveOrder', saveOrder);

module.exports = router;