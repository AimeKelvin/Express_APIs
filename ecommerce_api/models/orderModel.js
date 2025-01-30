import db from '../config/db.js';

// Create a new order
export const createOrder = (userId, totalAmount) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
    db.query(query, [userId, totalAmount], (err, result) => {
      if (err) reject(err);
      resolve(result.insertId);
    });
  });
};

// Get all orders for a user
export const getOrdersByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
