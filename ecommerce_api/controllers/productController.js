import db from "../config/db.js";
import multer from "multer";
import path from "path";

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }).single("image"); // Handle single file upload

// Create a new product with an image
export const createProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const { name, description, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const query = "INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [name, description, price, stock, image], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ id: result.insertId, name, description, price, stock, image });
    });
  });
};

// Get all products
export const getAllProducts = (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
};

// Get a product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;

  // Query to fetch product details
  const productQuery = "SELECT * FROM products WHERE id = ?";

  // Query to fetch product images
  const imagesQuery = "SELECT image_url FROM product_images WHERE product_id = ?";

  db.query(productQuery, [id], (err, productResult) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!productResult.length) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Fetch images after getting the product
    db.query(imagesQuery, [id], (err, imagesResult) => {
      if (err) {
        console.error("Error fetching images:", err);
        return res.status(500).json({ error: "Error fetching product images" });
      }

      // Add images array to product details
      const product = {
        ...productResult[0],
        images: imagesResult.map((img) => img.image_url), // Convert rows to array of URLs
      };

      res.status(200).json(product);
    });
  });
};



// Update a product (image optional)
export const updateProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }

    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const query = image
      ? "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?"
      : "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?";

    const params = image ? [name, description, price, stock, image, id] : [name, description, price, stock, id];

    db.query(query, params, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product updated successfully" });
    });
  });
};

// Delete a product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
};
