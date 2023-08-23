function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

let todoinput = document.querySelector(".input");
let addtodobutton = document.querySelector(".button");
let showtodo = document.querySelector(".todocontainer");
let localdata = JSON.parse(localStorage.getItem("todo"));
let todolist = localdata || [];
addtodobutton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = todoinput.value;
    if (todo.length > 0) {
        todolist.push({
            todo,
            id: uuid(),
            iscompleted: false,
        });
    }
    localStorage.setItem("todo", JSON.stringify(todolist));
    renderTodoList(todolist);

    todoinput.value = "";
});
showtodo.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delkey = e.target.dataset.todokey;
    todolist = todolist.filter((todo) => todo.id !== delkey);
    todolist = todolist.map((todo) => {
        if (todo.id === key) 
        
        {
            return { ...todo, iscompleted: !todo.iscompleted };
        } else {
            return todo;
        }
    });
    localStorage.setItem("todo", JSON.stringify(todolist));

    renderTodoList(todolist);
    console.log(e.target);
});

function renderTodoList(todoList) {
    showtodo.innerHTML = ""; // Clear the container before rendering
    for (const { todo, id, iscompleted } of todoList) {
        const todoItemHTML = `
            <div class="itemscontainer">
                <input type="checkbox" id="item-${id}" data-key=${id} ${
            iscompleted ? "checked" : ""
        }>
                <label for="item-${id}" data-key=${id} class='${
            iscompleted ? "checkedtodo" : "notcheckedtodo"
        }'>
                    ${todo}
                </label>
                <button class="btndel"><span data-todokey=${id} class="material-icons-outlined">
                delete
                </span></button>
            </div>`;
        showtodo.insertAdjacentHTML("beforeend", todoItemHTML); // Append the HTML
    }
}

renderTodoList(todolist);
