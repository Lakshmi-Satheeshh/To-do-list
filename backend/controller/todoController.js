const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.user.id });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user.id) return res.status(404).json({ message: "Not found or unauthorized" });

  todo.text = req.body.text;
  await todo.save();
  res.json(todo);
};
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Not found or unauthorized" });
    }

    await Todo.findByIdAndDelete(req.params.id); // ✅ Correct way to delete
    res.json({ message: "Todo removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

// const deleteTodo = async (req, res) => {
//   const todo = await Todo.findById(req.params.id);
//   if (!todo || todo.user.toString() !== req.user.id) return res.status(404).json({ message: "Not found or unauthorized" });

//   await todo.remove();
//   res.json({ message: "Todo removed" });
// };

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
















































































































// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) return res.status(400).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ username, email, password: hashedPassword });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//   res.status(201).json({ user: { id: user._id, email: user.email }, token });
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//   res.json({ user: { id: user._id, email: user.email }, token });
// };

// module.exports = { registerUser, loginUser };