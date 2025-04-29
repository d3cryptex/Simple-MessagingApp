let users = [{username: "test", password: "test123"}];
let authorizatedUser = "";

const form = document.getElementById("form");

form.onsubmit = function(event) {
    event.preventDefault();

    users.forEach((n) => {
        console.log(n);
    });

    const username = document.querySelector(".username-input");
    const password = document.querySelector(".password-input");

    const username_value = username.value.trim();
    const password_value = password.value.trim();

    if (!username_value || !password_value) {
		alert("Please, fill all inputs!");     
        return false;
    }         

    let userExists = users.find(user => user.username === username_value);

    if (userExists) {
        let isPassValid = userExists.password === password_value;

        if(isPassValid) {
            authorizatedUser = username_value;
            localStorage.setItem('authorizatedUser', authorizatedUser);
            console.log("username_value && password_value is valid")
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        }
        else{
            alert("Incorrect password!");    
        }
    }
    else{
        users.push({username: username_value, password: password_value});
        authorizatedUser = username_value;
        localStorage.setItem('authorizatedUser', authorizatedUser);
        SaveUsers();
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1000);
    }

    users.forEach((n) => {
        console.log(n);
    });
};

function SaveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function LoadUsers() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

window.onload = function() {
    LoadUsers();
};