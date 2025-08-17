const express = require("express");
const app = express();
app.use(express.json());
let Todos = [];

app.get("/", (req, res) => {
  res.send(Todos);
});

app.post("/", (req, res) => {
  const todo = req.body;
  Todos.push(todo);
  res.status(201).send(Todos);
});

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  if (id < 0 || id >= Todos.length) {
    res.status(404).send({ error: "Todo not found" });
  } else {
    Todos[id] = updatedTodo;
    res.send(Todos);
  }
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= Todos.length) {
    res.status(404).send({ error: " Todo not found" });
  } else {
    Todos.splice(id, 1);
    res.send(Todos);
  }
});
app.listen(3000);
