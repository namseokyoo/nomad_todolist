const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    editBtn = document.querySelector(".editBtn");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function deleteName() {
    localStorage.clear(USER_LS);
}

function editName() {
    const edit = document.querySelector(".js-editName");
    edit.addEventListener("click", deleteName);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const date = new Date().getHours();
    var time = "Good night";
    if (date >= 5 && date < 12) {
        time = "Good morning";
    } else if (date >= 12 && date < 18) {
        time = "Good afternoon";
    }
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${time} ${text}`;
    editBtn.classList.add(SHOWING_CN);
}

function loadName() {
    const currntUser = localStorage.getItem(USER_LS);
    if (currntUser === null) {
        askForName();
    } else {
        paintGreeting(currntUser);
        editName();
    }
}
function init() {
    loadName();
}

init();
