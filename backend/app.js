const express = require("express");
const cors = require("cors");
const app = express();

// Use environment port or 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database"
let todos = [
  { id: 1, text: "Connect frontend to backend", completed: false },
  { id: 2, text: "Run the server", completed: false },
];
let nextId = 3;

// Routes

// Get all todos
app.get("/todos", (req, res) => {
  console.log("GET /todos: Sending current todos");
  res.json(todos);
});

// Add new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: nextId++,
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("POST /todos: Added", newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const originalLength = todos.length;
  todos = todos.filter((todo) => todo.id !== idToDelete);

  if (todos.length === originalLength) {
    // No todo removed
    res.status(404).json({ error: "Todo not found" });
    console.log(`DELETE /todos/${idToDelete}: Todo not found`);
  } else {
    res.status(200).json({ message: "Todo deleted successfully" });
    console.log(`DELETE /todos/${idToDelete}: Todo deleted`);
  }
});

// Update a todo partially (text or completed)
app.patch("/todos/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const todo = todos.find((item) => item.id === idToUpdate);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    console.log(`PATCH /todos/${idToUpdate}: Todo not found`);
    return;
  }

  // Update fields if provided
  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.status(200).json(todo);
  console.log(`PATCH /todos/${idToUpdate}: Updated`, todo);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Backend live at http://localhost:${port}`);
});
