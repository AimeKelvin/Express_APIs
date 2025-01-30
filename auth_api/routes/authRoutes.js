import express from "express";
import { register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
export default router;

router.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
  });