const mainTodoElem = document.querySelector(".show-todo");
const inputValue = document.getElementById("input-text");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("Todo-Item"));
};

const addTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem("Todo-Item", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main-todo--div");
  divElement.innerHTML = `<li>${curElem}</li> <button class="delete-btn">Delete</button>`;
  mainTodoElem.append(divElement);
};

let addTodoList = (event) => {
  event.preventDefault();

  const todoListValue = inputValue.value.trim();
  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    localStorage.setItem("Todo-Item", JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;

  let parentElem = todoToRemove.parentElement;

  localTodoLists = localTodoLists.filter((curElem) => {
    return curElem !== todoListContent;
  });

  addTodoListLocalStorage(localTodoLists);
  parentElem.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("delete-btn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
