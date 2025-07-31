function addTodo(){
    const inputEl = document.getElementById("todo-input");

    const textNode = document.createElement("li");
    textNode.innerHTML = inputEl.value;
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.style.marginLeft = "10px"
    deleteButton.addEventListener("click",function(){
        textNode.remove();
    })


    
    const parentsEL = document.getElementById("listt");
    parentsEL.appendChild(textNode);
    textNode.appendChild(deleteButton);
    


}

const interKey = document.getElementById("todo-input");
interKey.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        addTodo();
    }
})