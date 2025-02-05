import db from "../config/db.js"; // Import your DB connection

// Add item to cart
export const addToCart = async (userId, productId, quantity) => {
  const sql = `
    INSERT INTO cart (user_id, product_id, quantity) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE quantity = quantity + ?;
  `;
  return db.query(sql, [userId, productId, quantity, quantity]);
};

// Get cart items for a user
export const getCartItems = async (userId) => {
  const sql = `
    SELECT c.id, p.name, p.price, p.image, c.quantity 
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?;
  `;
  return db.query(sql, [userId]);
};

// Update cart item quantity
export const updateCartQuantity = async (cartId, quantity) => {
  const sql = `UPDATE cart SET quantity = ? WHERE id = ?`;
  return db.query(sql, [quantity, cartId]);
};

// Remove item from cart
export const removeCartItem = async (cartId) => {
  const sql = `DELETE FROM cart WHERE id = ?`;
  return db.query(sql, [cartId]);
};

// Clear cart for a user
export const clearCart = async (userId) => {
  const sql = `DELETE FROM cart WHERE user_id = ?`;
  return db.query(sql, [userId]);
};
