const express = require('express');
const router = express.Router();
const { saveUserdata } = require('../controllers/previewController');

router.post('/saveUserdata', saveUserdata);

module.exports = router;