import express from 'express';
import { placeOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/user/:userId', placeOrder);
router.get('/user/:userId', getOrders);

export default router;
