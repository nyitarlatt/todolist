//css
const btnAdd = document.querySelector(".submit_task");

const btnClick = function (mouse, type, cls) {
  btnAdd.addEventListener(`${mouse}`, function () {
    if (type === "add") btnAdd.classList.add(`${cls}`);
    if (type === "remove") btnAdd.classList.remove(`${cls}`);
  });
};

btnClick("mouseenter", "add", "mousein");
btnClick("mouseleave", "remove", "mousein");
btnClick("mousedown", "add", "btn_clicked");
document.querySelector("*").addEventListener("mouseup", function () {
  btnAdd.classList.remove("btn_clicked");
});
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//pre selected doms
const tasks = document.querySelector(".tasks");
const input = document.querySelector(".input_task");
const tabs = document.querySelector(".task_tabs");
const btnTabs = document.querySelectorAll(".btn_tab");
const innerContainer = document.querySelector(".container");
const btnClear = document.querySelector(".btn_clear");

//gloval variables
let allArr = [];
let curTab = "all";
let id = 0; //id for each task

////----functions------

//high light
const highLight = function () {
  btnTabs.forEach((tab) => {
    if (tab.classList.contains(curTab)) {
      tab.classList.add("highlight");
    } else {
      tab.classList.remove("highlight");
    }
  });
};

//add new task
const addNewTask = function () {
  if (!input.value) return;
  id++;
  const html = `
          <div class="task" data-number=${id}>
            <div class="btn_checked"></div>
            <p class="task_text">${input.value}</p>
            <button class="btn_remove">X</button>
          </div>
    `;
  allArr.push(html);
};

//clear input field
const clearInput = function () {
  input.value = "";
};

//clear task field
const clearList = function () {
  while (document.querySelector(".task")) {
    document.querySelector(".task").remove();
  }
};

// remove task element
const removeTaskElement = function (data) {
  document.querySelectorAll(".task").forEach((task) => {
    if (task.dataset.number === data) task.remove();
  });
};

//remove task from all array
const removeTaskString = function (data) {
  allArr = allArr.filter((task) => {
    return task[task.indexOf("number") + 7] !== data;
  });
};

//show all tab
const showAllTab = function () {
  clearList();
  allArr.forEach((task) => {
    tasks.insertAdjacentHTML("beforeend", task);
  });
};

//show active tab
const showActiveTab = function () {
  clearList();
  allArr.forEach((task) => {
    if (!task.includes("finished")) tasks.insertAdjacentHTML("beforeend", task);
  });
};

//show finish tab
const showFinishTab = function () {
  clearList();
  allArr.forEach((task) => {
    if (task.includes("finished")) tasks.insertAdjacentHTML("beforeend", task);
  });
};

//activate a task
const reactive = function (data) {
  allArr = allArr.map((task) => {
    if (task[task.indexOf("number") + 7] == data) {
      task = task.replace("task finished", "task");
      task = task.replace("btn_checked checked", "btn_checked");
      task = task.replace("task_text checked_text", "task_text");
      return task;
    } else {
      return task;
    }
  });
};

//deactivate a task
const deactive = function (data) {
  allArr = allArr.map((task) => {
    if (task[task.indexOf("number") + 7] == data) {
      task = task.replace("task", "task finished");
      task = task.replace("btn_checked", "btn_checked checked");
      task = task.replace("task_text", "task_text checked_text");
      return task;
    } else {
      return task;
    }
  });
};

//show tasks
const showTask = function () {
  if (curTab === "all") {
    showAllTab();
  }
  if (curTab === "active") {
    showActiveTab();
  }
  if (curTab === "finish") {
    showFinishTab();
  }
};

//clear all task
const clearAll = function () {
  clearList();
  allArr = [];
  console.log("noice");
};

//event listener
innerContainer.addEventListener("click", function (e) {
  const element = e.target.classList;

  //add new task
  if (element.contains("submit_task")) {
    addNewTask();
    clearInput();
    showTask();
  }

  //change all tab
  if (element.contains("all")) {
    curTab = "all";
    highLight();
    showTask();
  }

  //change active task
  if (element.contains("active")) {
    curTab = "active";
    highLight();
    showTask();
  }

  //change finished tab
  if (element.contains("finish")) {
    curTab = "finish";
    highLight();
    showTask();
  }

  //remove task
  if (element.contains("btn_remove")) {
    removeTaskString(e.target.parentElement.dataset.number);
    removeTaskElement(e.target.parentElement.dataset.number);
  }

  //checked task
  if (element.contains("btn_checked")) {
    /////--reactive a task
    if (element.contains("checked")) {
      console.log("reactive");
      e.target.classList.remove("checked");
      e.target.nextElementSibling.classList.remove("checked_text");
      reactive(e.target.parentElement.dataset.number);
    } else {
      //deactive a task
      console.log("deactive");
      e.target.classList.add("checked");
      e.target.nextElementSibling.classList.add("checked_text");
      deactive(e.target.parentElement.dataset.number);
    }
    showTask();
  }
});

//add task enter
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addNewTask();
    clearInput();
    showTask();
  }
});

//clear all task
btnClear.addEventListener("click", clearAll);
