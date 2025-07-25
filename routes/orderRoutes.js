const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', auth, createOrder);
router.get('/my', auth, getMyOrders);
router.get('/', auth, getAllOrders); // Admin can see all orders
router.put('/:id', auth, updateOrderStatus); // Update order status

module.exports = router;
