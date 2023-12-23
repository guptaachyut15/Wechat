var socket = io("http://localhost:8080");
const audio = new Audio("../ting.mp3");

let form = document.getElementById("send-container");
let messageInp = document.getElementById("messageInp");
let messageContainer = document.getElementById("chatbox");

const addMessage = function (message, position) {
  let messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  if (position === "left") {
    messageElement.classList.add("received");
  } else if (position === "right") {
    messageElement.classList.add("sent");
  }
  messageContainer.append(messageElement);
};

let userName = prompt("Enter your name");
while (!userName) {
  userName = prompt("Enter a valid name");
}

socket.emit("user-joined", userName);

socket.on("user-joined", (name) => {
  addMessage(`${name} joined the chat`, "center");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = messageInp.value;
  addMessage(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInp.value = "";
});

socket.on("send", (messageObject) => {
  addMessage(`${messageObject.name}: ${messageObject.msg}`, "left");
  audio.play();
});

socket.on("user-left", (name) => {
  addMessage(`${name} left`, "center");
});
