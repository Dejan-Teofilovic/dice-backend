const express = require('express');
const router = express.Router();
const {
  login,
  checkExpirationOfToken,
  getAllWaitingList,
  getAllOrders,
  getAllOrderStatuses,
  changeOrderStatus,
  getOrderById,
  signup
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/signup', signup);
router.get('/check-expiration-of-token', authMiddleware, checkExpirationOfToken);
router.get('/get-all-waiting-list', authMiddleware, getAllWaitingList);
router.get('/get-all-order-statuses', authMiddleware, getAllOrderStatuses);
router.get('/get-all-orders', authMiddleware, getAllOrders);
router.put('/change-order-status/:orderId', authMiddleware, changeOrderStatus);
router.get('/get-order-by-id/:id', authMiddleware, getOrderById);

module.exports = router;