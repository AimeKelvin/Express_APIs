import express from "express";
import {
  addCartItem,
  fetchCartItems,
  modifyCartItem,
  deleteCartItem,
  emptyCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", addCartItem); // Add to cart
router.get("/cart/:userId", fetchCartItems); // Get cart items
router.put("/cart", modifyCartItem); // Update cart item quantity
router.delete("/cart/:cartId", deleteCartItem); // Remove item from cart
router.delete("/cart/user/:userId", emptyCart); // Clear cart

export default router;
