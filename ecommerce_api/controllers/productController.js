import db from '../config/db.js';  // Make sure db is correctly imported

// Create a new product
export const createProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';

  db.query(query, [name, description, price, stock], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  });
};

// Get all products
export const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// Get a product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!result.length) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Update a product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?';

  db.query(query, [name, description, price, stock, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  });
};

// Delete a product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
};
