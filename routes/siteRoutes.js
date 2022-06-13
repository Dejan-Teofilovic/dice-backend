const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/siteController');

router.post('/createOrder', createOrder);

module.exports = router;