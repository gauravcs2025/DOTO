const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

const JWT_SERCET = "Password";

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = [];

let todos = [
  { id: 1, text: "Connect frontend to backend", completed: false },
  { id: 2, text: "Run the server", completed: false },
];
let nextId = 3;

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((user) => user.username === username)) {
    return res.json({
      message: "You are already signed in",
    });
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed up successfully",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (foundUser) {
    const token = jwt.sign(
      {
        username: foundUser.username,
      },
      JWT_SERCET
    );
    return res.json({
      message: "You have signed in successfully",
      token: token,
    });
  } else {
    return res.json({
      message: "Inavalid username or password",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      message: "TOken is missing!",
    });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SERCET);

    req.username = decodedData.username;
    next();
  } catch (error) {
    return res.json({
      message: "Invalid Token",
    });
  }
}

app.get("/me", auth, function (req, res) {
  const currentUser = req.username;

  const foundUser = users.find((user) => user.username === currentUser);

  if (foundUser) {
    return res.json({
      Username: "foundUser.username",
      Password: "foundUser.password",
    });
  }
});

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

app.listen(port, () => {
  console.log(`🚀 Backend live at http://localhost:${port}`);
});
