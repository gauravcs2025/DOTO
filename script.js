document.addEventListener("DOMContentLoaded", function () {
  const inputEl = document.getElementById("todo-input");
  const listEl = document.getElementById("todo-list-ol");
  const addButton = document.getElementById("add-button");

  // The URL of your running backend server
  const API_URL = "https://doto-mvkd.onrender.com/";

  // --- Functions that talk to the Backend API ---

  // 1. Fetches all todos from the server and displays them
  async function fetchAndRenderTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const todos = await response.json();

      listEl.innerHTML = ""; // Clear the list before rendering

      todos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        // When delete is clicked, call the deleteTodo function with the todo's ID
        deleteButton.onclick = () => deleteTodo(todo.id);

        li.appendChild(deleteButton);
        listEl.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  // 2. Sends a new todo to the server
  async function addTodo() {
    const todoText = inputEl.value.trim();
    if (todoText === "") return;

    try {
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todoText }),
      });

      inputEl.value = ""; // Clear the input field
      fetchAndRenderTodos(); // Refresh the list from the server
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  // 3. Tells the server to delete a todo by its ID
  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      fetchAndRenderTodos(); // Refresh the list from the server
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // --- Event Listeners ---
  addButton.addEventListener("click", addTodo);
  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });

  // --- Initial Load ---
  // Fetch and display the todos as soon as the page loads
  fetchAndRenderTodos();

  // (Your clock code can remain here unchanged)
  const clockEl = document.getElementById("clock");
  function updateClock() {
    clockEl.textContent = new Date().toLocaleTimeString("en-IN");
  }
  setInterval(updateClock, 1000);
  updateClock();
});
