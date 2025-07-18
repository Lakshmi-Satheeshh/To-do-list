const express = require("express");
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controller/todoController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTodos);           // ✅ Test in Postman
router.post("/", protect, createTodo);        // ✅ Test in Postman
router.put("/:id", protect, updateTodo);      // ✅ Test in Postman
router.delete("/:id", protect, deleteTodo);   // ✅ Test in Postman

module.exports = router;