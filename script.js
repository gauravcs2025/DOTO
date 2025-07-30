function addTodo(){
    const inputEl = document.getElementById("todo-input");

    const textNode = document.createElement("li");
    const deleteButton = document.createElement("button")

    textNode.innerHTML = inputEl.value;
    const parentsEL = document.getElementById("list");
    parentsEL.appendChild(textNode);
    parentsEL.appendChild(deleteButton)


}