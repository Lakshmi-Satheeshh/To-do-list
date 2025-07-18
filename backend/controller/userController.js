
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({ user: { id: user._id, email: user.email }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ user: { id: user._id, email: user.email }, token });
};

module.exports = { registerUser, loginUser };












































































// const User = require('../models/userModel');
// const Todo = require('../models/todoModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Middleware to protect routes
// exports.authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };

// // To-Do CRUD
// exports.createTodo = async (req, res) => {
//   try {
//     const { title, description, status } = req.body;
//     const todo = await Todo.create({
//       userId: req.user,
//       title,
//       description,
//       status
//     });
//     res.status(201).json(todo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.user });
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findOneAndUpdate(
//       { _id: id, userId: req.user },
//       req.body,
//       { new: true }
//     );
//     if (!todo) return res.status(404).json({ message: 'Todo not found' });
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user });
//     if (!todo) return res.status(404).json({ message: 'Todo not found' });
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
