import db from '../config/db.js';

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// More functions to interact with the database, like `createProduct`, `getProductById`, etc.
