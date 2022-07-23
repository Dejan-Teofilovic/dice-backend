const express = require('express');
const router = express.Router();
const { login, checkExpirationOfToken } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/check-expiration-of-token', authMiddleware, checkExpirationOfToken);

module.exports = router;