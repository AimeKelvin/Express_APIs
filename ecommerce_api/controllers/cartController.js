import { addToCart, getCartByUserId, removeFromCart, clearCart } from "../models/cartModel.js";

// Add item to cart
export const addToCartController = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  addToCart(user_id, product_id, quantity, (err, result) => {
    if (err) {
      console.error("Error adding to cart:", err);
      return res.status(500).json({ error: "Failed to add item to cart" });
    }
    res.status(201).json({ message: "Item added to cart", result });
  });
};

// Get cart items
export const getCartController = (req, res) => {
  const { user_id } = req.params;

  getCartByUserId(user_id, (err, results) => {
    if (err) {
      console.error("Error fetching cart:", err);
      return res.status(500).json({ error: "Failed to fetch cart items" });
    }
    res.status(200).json(results);
  });
};

// Remove item from cart
export const removeFromCartController = (req, res) => {
  const { id } = req.params;

  removeFromCart(id, (err, result) => {
    if (err) {
      console.error("Error removing cart item:", err);
      return res.status(500).json({ error: "Failed to remove item from cart" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  });
};

// Clear entire cart
export const clearCartController = (req, res) => {
  const { user_id } = req.params;

  clearCart(user_id, (err, result) => {
    if (err) {
      console.error("Error clearing cart:", err);
      return res.status(500).json({ error: "Failed to clear cart" });
    }
    res.status(200).json({ message: "Cart cleared" });
  });
};
