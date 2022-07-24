const express = require('express');
const router = express.Router();
const { login, checkExpirationOfToken, getAllWaitingList } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/check-expiration-of-token', authMiddleware, checkExpirationOfToken);
router.get('/get-all-waiting-list', authMiddleware, getAllWaitingList);

module.exports = router;