import db from '../config/db.js';
import bcrypt from 'bcryptjs';

// Register a new user
export const registerUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash password

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Find user by email
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};
