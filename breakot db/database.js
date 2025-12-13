const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('breakout.db');

// Users Table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  wallet INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Drinks Table
db.run(`CREATE TABLE IF NOT EXISTS drinks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER,
  points INTEGER,
  image TEXT,
  flavors TEXT
)`);

// Orders Table
db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total_price INTEGER,
  total_points INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// OrderItems Table
db.run(`CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  drink_id INTEGER,
  flavor TEXT,
  quantity INTEGER,
  notes TEXT,
  price INTEGER,
  points INTEGER,
  FOREIGN KEY(order_id) REFERENCES orders(id),
  FOREIGN KEY(drink_id) REFERENCES drinks(id)
)`);

module.exports = db;
