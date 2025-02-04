import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Route for creating a product
router.post('/', createProduct);

// Route for fetching all products
router.get('/', getAllProducts);

// Route for fetching a product by ID
router.get('/product/:id', getProductById);

// Route for updating a product
router.put('/product/:id', updateProduct);

// Route for deleting a product
router.delete('/product/:id', deleteProduct);

export default router;
