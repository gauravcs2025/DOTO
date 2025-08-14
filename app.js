const express = require("express");
const cors = require("cors"); // Required to allow frontend to connect
const app = express();
const port = 3000;

// --- Middleware ---
app.use(cors()); // Enable all CORS requests
app.use(express.json()); // Allow the server to parse JSON in request bodies

// --- In-Memory "Database" ---
// We start with a few items for demonstration
let todos = [
  { id: 1, text: "Connect frontend to backend", completed: false },
  { id: 2, text: "Run the server", completed: false },
];
let nextId = 3; // To create unique IDs for new todos

// --- API Routes ---

// GET /todos: Sends the current list of all todos
app.get("/todos", (req, res) => {
  console.log("GET /todos: Sending the list of todos.");
  res.json(todos);
});

// POST /todos: Adds a new todo to the list
app.post("/todos", (req, res) => {
  const newTodo = {
    id: nextId++,
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("POST /todos: Added new todo ->", newTodo);
  res.status(201).json(newTodo);
});

// DELETE /todos/:id: Removes a todo from the list
app.delete("/todos/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== idToDelete);
  console.log(`DELETE /todos/${idToDelete}: Todo removed.`);
  res.status(200).json({ message: "Todo deleted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(
    `🚀 Backend server is live and running at http://localhost:${port}`
  );
});
