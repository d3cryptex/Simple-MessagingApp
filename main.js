
let messages = [];

const username = localStorage.getItem('authorizatedUser');

const input = document.querySelector(".input");
const sendBtn = document.querySelector(".send-btn");
const chat = document.querySelector(".chat-window");

const date = new Date()
        
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); 
const day = String(date.getDate()).padStart(2, '0');

const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');

const formatted_date = `${year}/${month}/${day} ${hours}:${minutes}`;

input.oninput = function() {
    sendBtn.onclick = function() {
        let message = input.value;
        let messageDiv = document.createElement("div");
        let elName = document.createElement("p");
        let elDate = document.createElement("span");
        let elMessage = document.createElement("p");

        messageDiv.classList.add("message-container");
        elName.classList.add("message-name");
        elDate.classList.add("message-date");
        elMessage.classList.add("message");

        elName.innerText = username;
        elDate.innerText = formatted_date;
        elMessage.innerText = ": " + message;

        chat.appendChild(messageDiv);
        messageDiv.appendChild(elName);
        elName.appendChild(elDate);
        messageDiv.appendChild(elMessage);

        messages.push({username: username, message: message, date: formatted_date});

        input.value = "";

        SaveMessages();
    };
};

function SaveMessages() {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function LoadMessages() {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    }

    messages.forEach((n) => {
        let messageDiv = document.createElement("div");
        let elName = document.createElement("p");
        let elDate = document.createElement("span");
        let elMessage = document.createElement("p");

        messageDiv.classList.add(n.username !== username ? "message-container-anotheruser" : "message-container");
        elName.classList.add("message-name");
        elDate.classList.add("message-date");
        elMessage.classList.add("message");

        elName.innerText = n.username;
        elDate.innerText = n.date;
        elMessage.innerText = n.username !== username ? n.message + " :" : ": " + n.message;

        if(n.username !== username) {
            chat.appendChild(messageDiv);
            messageDiv.appendChild(elMessage);
            messageDiv.appendChild(elDate);
            messageDiv.appendChild(elName);
        }
        else{
            chat.appendChild(messageDiv);
            messageDiv.appendChild(elName);
            elName.appendChild(elDate);
            messageDiv.appendChild(elMessage);
        }
    });
}

function LoadUser() {
    const title = document.querySelector(".title");

    console.log(username);

    title.textContent = `Hello, ${username}`;
}

window.onload = function() {
    LoadUser();
    LoadMessages();
};