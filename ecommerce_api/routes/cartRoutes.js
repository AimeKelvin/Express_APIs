import express from "express";
import { 
  addToCartController, 
  getCartController, 
  removeFromCartController, 
  clearCartController 
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCartController); // Add item to cart
router.get("/:user_id", getCartController); // Get user's cart
router.delete("/remove/:id", removeFromCartController); // Remove item
router.delete("/clear/:user_id", clearCartController); // Clear cart

export default router;
