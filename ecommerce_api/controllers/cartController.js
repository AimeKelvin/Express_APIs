import {
    addToCart,
    getCartItems,
    updateCartQuantity,
    removeCartItem,
    clearCart,
  } from "../models/cartModel.js";
  
  // Add item to cart
  export const addCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      await addToCart(userId, productId, quantity);
      res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  };
  
  // Get user cart items
  export const fetchCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
      const [cartItems] = await getCartItems(userId);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  };
  
  // Update cart item quantity
  export const modifyCartItem = async (req, res) => {
    const { cartId, quantity } = req.body;
    try {
      await updateCartQuantity(cartId, quantity);
      res.status(200).json({ message: "Cart item updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  };
  
  // Remove cart item
  export const deleteCartItem = async (req, res) => {
    const { cartId } = req.params;
    try {
      await removeCartItem(cartId);
      res.status(200).json({ message: "Cart item removed" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  };
  
  // Clear entire cart
  export const emptyCart = async (req, res) => {
    const { userId } = req.params;
    try {
      await clearCart(userId);
      res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  };
  