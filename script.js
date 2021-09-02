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
const btnTabs = document.querySelectorAll(".tab_text");
const innerContainer = document.querySelector(".container");
const btnNight = document.querySelector(".night_mode");

//gloval variables
let allArr = [];
let curTab = "all";
let id = 0; //id for each task
let night = true;

////----functions------

//set tasks length
const setLength = function () {
  let len = 0;
  if (curTab === "all") {
    len = allArr.length;
  } else if (curTab === "finish") {
    allArr.forEach((task) => {
      if (task.includes("finished")) len++;
    });
  } else {
    allArr.forEach((task) => {
      if (!task.includes("finished")) len++;
    });
  }

  const height = len >= 5 ? 27 : len * 6;
  document.documentElement.style.setProperty("--tasks--", `${height}vh`);
};

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
    tasks.insertAdjacentHTML("afterbegin", task);
  });
};

//show active tab
const showActiveTab = function () {
  clearList();
  allArr.forEach((task) => {
    if (!task.includes("finished"))
      tasks.insertAdjacentHTML("afterbegin", task);
  });
};

//show finish tab
const showFinishTab = function () {
  clearList();
  allArr.forEach((task) => {
    if (task.includes("finished")) tasks.insertAdjacentHTML("afterbegin", task);
  });
};

//activate a task
const reactive = function (data) {
  allArr = allArr.map((task) => {
    const dt = matchD(task);
    if (dt == data) {
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
    const dt = matchD(task);
    if (dt == data) {
      task = task.replace("task", "task finished");
      task = task.replace("btn_checked", "btn_checked checked");
      task = task.replace("task_text", "task_text checked_text");
      return task;
    } else {
      return task;
    }
  });
};

//match dataset
const matchD = function (task) {
  return task[task.indexOf("number") + 8] !== ">"
    ? +task[task.indexOf("number") + 8] + +task[task.indexOf("number") + 7] * 10
    : task[task.indexOf("number") + 7];
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
  setLength();
};

//clear all task
const clearAll = function () {
  clearList();
  allArr = [];
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

  //clear task
  if (element.contains("clear")) {
    clearAll();
    setLength();
  }

  //remove task
  if (element.contains("btn_remove")) {
    removeTaskString(e.target.parentElement.dataset.number);
    removeTaskElement(e.target.parentElement.dataset.number);
    setLength();
  }

  //checked task
  if (element.contains("btn_checked")) {
    /////--reactive a task
    if (element.contains("checked")) {
      e.target.classList.remove("checked");
      e.target.nextElementSibling.classList.remove("checked_text");

      console.log("act");
      reactive(e.target.parentElement.dataset.number);
    } else {
      //deactive a task
      e.target.classList.add("checked");
      e.target.nextElementSibling.classList.add("checked_text");

      console.log("deact");
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

//night mode
btnNight.addEventListener("click", function () {
  if (night) {
    btnNight.innerHTML = "🌙";

    document.documentElement.style.setProperty("--night--", "#FFF");
    document.documentElement.style.setProperty("--white--", "#000");
    document.documentElement.style.setProperty("--black--", "#FFF");
    document.documentElement.style.setProperty("--img--", "url('ice.jpg')");
    document.documentElement.style.setProperty("--bkcolor--", "#E1E0E0");

    night = false;
    console.log("fsad");
  } else {
    document.documentElement.style.setProperty("--night--", "#25273c");
    document.documentElement.style.setProperty("--white--", "#FFF");
    document.documentElement.style.setProperty("--black--", "#000");
    document.documentElement.style.setProperty("--img--", "url('sky.jpg')");
    document.documentElement.style.setProperty("--bkcolor--", "#161722");

    btnNight.innerHTML = "☀️";
    night = true;
  }
});
