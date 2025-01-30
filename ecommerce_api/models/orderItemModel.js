import db from '../config/db.js';

// Create an order item
export const createOrderItem = (orderId, productId, quantity, price) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(query, [orderId, productId, quantity, price], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Update product stock after order is placed
export const updateProductStock = (productId, quantity) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET stock = stock - ? WHERE id = ?';
    db.query(query, [quantity, productId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
