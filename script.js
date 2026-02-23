var fortunes = [
  "True wisdom comes not from knowledge, but from understanding.",
  "A journey of a thousand miles begins with a single step.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "You cannot change the wind, but you can adjust your sails.",
  "In the middle of difficulty lies opportunity.",
  "Success is not final; failure is not fatal: courage to continue counts.",
  "Life is what happens when you are busy making other plans.",
  "The only way to do great work is to love what you do.",
  "Strive not to be a success, but rather to be of value.",
  "It does not matter how slowly you go as long as you do not stop."
];

function showRandomFortune() {
  var randomIndex = Math.floor(Math.random() * fortunes.length);
  var box = document.getElementById("fortune-box");
  box.textContent = fortunes[randomIndex];
}

var themes = {
  green: {
    color:      "#155724",
    background: "#d4edda",
    border:     "#28a745",
    fontSize:   "18px",
    fontFamily: "Georgia, serif"
  },
  yellow: {
    color:      "#856404",
    background: "#fff3cd",
    border:     "#ffc107",
    fontSize:   "25px",
    fontFamily: "Verdana, sans-serif"
  },
  blue: {
    color:      "#0c3547",
    background: "#d1ecf1",
    border:     "#17a2b8",
    fontSize:   "15px",
    fontFamily: "Courier New, monospace"
  },
  orange: {
    color:      "#7d2e00",
    background: "#ffe5d0",
    border:     "#fd7e14",
    fontSize:   "20px",
    fontFamily: "Trebuchet MS, sans-serif"
  }
};

function applyTheme(themeName) {
  var box   = document.getElementById("fortune-box");
  var theme = themes[themeName];
  box.style.color       = theme.color;
  box.style.background  = theme.background;
  box.style.borderColor = theme.border;
  box.style.fontSize    = theme.fontSize;
  box.style.fontFamily  = theme.fontFamily;
}

showRandomFortune();
var seconds = 0;
var timerID = null;
var running = false;

function startTimer() {
  if (running || seconds >= 30) return;

  running = true;

  timerID = setInterval(function() {

    seconds += 3;

    document.getElementById("timer-display").textContent = seconds + "s";

    if (seconds >= 30) {
      seconds = 30;
      document.getElementById("timer-display").textContent = "30s";
      stopTimer();
    }

  }, 1000);
}

function stopTimer() {
  clearInterval(timerID);
  timerID = null;
  running = false;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  document.getElementById("timer-display").textContent = "0s";
}

var tasks = [];

function loadTasks() {
  var saved = localStorage.getItem("myTasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }

  renderTasks();
}

function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function addTask() {
  var input    = document.getElementById("todo-input");
  var taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: taskText,
    done: false
  });

  input.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function renderTasks() {
  var list = document.getElementById("todo-list");

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<li style='color:#aaa; padding:8px;'>No tasks yet. Add one above!</li>";
    return;
  }

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var li = document.createElement("li");

    if (task.done) {
      li.className = "done";
    }

    var checkbox    = document.createElement("input");
    checkbox.type   = "checkbox";
    checkbox.checked = task.done;

    checkbox.onchange = (function(index) {
      return function() { toggleDone(index); };
    })(i);

    var span = document.createElement("span");
    span.textContent = task.text;

    var delBtn       = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className   = "delete-btn";

    delBtn.onclick = (function(index) {
      return function() { deleteTask(index); };
    })(i);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  }
}

document.getElementById("todo-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
