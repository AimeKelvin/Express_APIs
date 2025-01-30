import { createOrder, getOrdersByUserId } from '../models/orderModel.js';
import { createOrderItem, updateProductStock } from '../models/orderItemModel.js';
import { getAllProducts } from '../models/productModel.js';

// Create a new order
export const placeOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await getAllProducts(item.productId);
      totalAmount += product[0].price * item.quantity;
    }

    // Create the order
    const orderId = await createOrder(userId, totalAmount);

    // Add order items and update stock
    for (const item of items) {
      await createOrderItem(orderId, item.productId, item.quantity, item.price);
      await updateProductStock(item.productId, item.quantity);
    }

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get orders by userId
export const getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
