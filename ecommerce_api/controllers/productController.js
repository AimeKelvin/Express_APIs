import db from '../config/db.js';

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

// More controller functions for getting, updating, and deleting products...
