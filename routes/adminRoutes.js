const express = require('express');
const router = express.Router();
const { login, checkExpirationOfToken, getAllWaitingList, getAllOrders, getAllOrderStatuses } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/check-expiration-of-token', authMiddleware, checkExpirationOfToken);
router.get('/get-all-waiting-list', authMiddleware, getAllWaitingList);
router.get('/get-all-order-statuses', authMiddleware, getAllOrderStatuses);
router.get('/get-all-orders', authMiddleware, getAllOrders);

module.exports = router;