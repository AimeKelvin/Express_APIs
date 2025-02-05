import db from "../config/db.js";

// Add item to cart
export const addToCart = (userId, productId, quantity, callback) => {
  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?;
  `;
  db.query(query, [userId, productId, quantity, quantity], callback);
};

// Get cart items for a user
export const getCartByUserId = (userId, callback) => {
  const query = `
    SELECT c.id, c.quantity, p.id AS product_id, p.name, p.price, p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?;
  `;
  db.query(query, [userId], callback);
};

// Remove an item from the cart
export const removeFromCart = (cartId, callback) => {
  const query = "DELETE FROM cart WHERE id = ?";
  db.query(query, [cartId], callback);
};

// Clear cart for a user
export const clearCart = (userId, callback) => {
  const query = "DELETE FROM cart WHERE user_id = ?";
  db.query(query, [userId], callback);
};
