var submitButton = document.getElementById("submitButton");
var sendMessage = document.getElementById("send");
var chatInput = document.getElementById("chatInput");

var name = '';
var socket = io();

//Event Listener
submitButton.addEventListener("click", login);
sendMessage.addEventListener('click', sendMessages);
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessages();
    }
});

function sendMessages() {
    var chatInputValue = document.getElementById("chatInput").value;

    if (chatInputValue == "") {
        alert("Message can't be empty!")
    } else {

        socket.emit("new message", { name: name, message: chatInputValue });
        document.getElementById("chatInput").value = "";
    }
}


socket.on("new message", function (data) {
    //console.log(user);
    updateMessageList(data);
})

function updateMessageList(data) {
    var messageList = document.getElementById("messageList");
    messageList.appendChild(createMessageList(data));
}


function createMessageList(data) {
    console.log(data);
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = data.name;
    li.textContent = data.message;
    li.appendChild(span);
    return li;
}


socket.on("has connected", function (users) {
    updateUserList(users);

})

socket.on("has disconnected", function (users) {
    updateUserList(users)
})

function updateUserList(users) {
    var list = document.getElementById("list");
    list.innerHTML = "";
    for (var i = 0; i < users.length; i++) {
        list.appendChild(createList(`${users[i]}`));
    }
}


function createList(name) {
    let li = document.createElement('li');
    li.textContent = name;
    return li;
}


//======================= Normal login with username : working with : index(backup.html)======================
// function login(e) {
//     e.preventDefault();
//     var submitButtonValue = document.getElementById('username').value;
//     if (submitButtonValue == '') {
//         document.getElementById('warningMessage').style.display = "block";
//         document.getElementById('warningMessage').textContent = "* Username can't be empty.";

//     } else {
//         var usernameRegex = /^[a-zA-Z0-9]+$/;
//         var validfirstUsername = submitButtonValue.match(usernameRegex);
//         if (validfirstUsername == null) {
//             document.getElementById('warningMessage').style.display = "block";
//             document.getElementById('warningMessage').textContent = "* Only characters A-Z, a-z are  acceptable.";
//         } else {
//             name = submitButtonValue;
//             document.getElementById('loginForm').style.display = "none";
//             document.getElementById('chatRoom').style.display = "block";
//             socket.emit("has connected", submitButtonValue);
//             document.getElementById("messageList").innerHTML = "";
//         }

//     }

// }
// /======================= Normal login with username ======================



// ==================== loin with username and password  ======================

// Define predefined user IDs and passkeys
const userCredentials = {
    "user1": "passkey1",
    "user2": "passkey2",
    "user3": "passkey3",
    "user4": "passkey4",
    "user5": "passkey5",
    'arpan':'arpan',
    'dk':'dk',
    'kdo':'kdo',
    '1': '1',
};

// Modify login function to check user credentials
function login(e) {
    e.preventDefault();
    var usernameInput = document.getElementById('username').value;
    var passkeyInput = document.getElementById('passkey').value;

    // Check if the entered username exists in predefined credentials and if the passkey matches
    if (userCredentials.hasOwnProperty(usernameInput) && userCredentials[usernameInput] === passkeyInput) {
        name = usernameInput;
        document.getElementById('loginForm').style.display = "none";
        document.getElementById('chatRoom').style.display = "block";
        socket.emit("has connected", usernameInput);
        document.getElementById("messageList").innerHTML = "";
    } else {
        document.getElementById('warningMessage').style.display = "block";
        document.getElementById('warningMessage').textContent = "* Invalid username or passkey.";
    }
}