function addTodo() {
  const inputEl = document.getElementById("todo-input");

  const textNode = document.createElement("li");
  textNode.innerHTML = inputEl.value;
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.style.marginLeft = "10px";
  deleteButton.addEventListener("click", function () {
    textNode.remove();
  });

  const parentsEL = document.getElementById("listt");
  parentsEL.appendChild(textNode);
  textNode.appendChild(deleteButton);
}

const interKey = document.getElementById("todo-input");
interKey.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

const clockEl = document.getElementById("clock");

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const timeStrings = `${hours}:${minutes}:${seconds}`;

  clockEl.textContent = timeStrings;
}
setInterval(updateClock, 1000);

updateClock();
