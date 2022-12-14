let username;
let sessionId;
let totalCartItems = 0;

window.onload = function() {
    username = localStorage.getItem("username")
    sessionId = sessionStorage.getItem('sessionId')
    console.log(username);
    console.log(sessionId);
    openOrCloseForm()
    showCartOrNo()
}


function openForm() {
    document.getElementById("login-div").style.display = "block";
    document.getElementById("invalid_data").innerHTML = ""
    var elements = document.getElementsByClassName("background")
    Array.prototype.forEach.call(elements, function(el) {
        el.style.opacity = 0.05;
    });
}
  
function closeForm() {
    document.getElementById("login-div").style.display = "none";
    var elements = document.getElementsByClassName("background")
    Array.prototype.forEach.call(elements, function(el) {
        el.style.opacity = 1;
    });
}

function logOut() {
    sessionId = null;
    openOrCloseForm()
    showCartOrNo()
}

async function sendData() {

    username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    let initHeaders = {
        method: "POST",
        headers: myHeaders
    }

    //password = encryptWithAES(password);
    let url = `http://localhost:8080/category.html/login?username=${username}&password=${password}`

    await fetch(url, initHeaders)
    .then(response => response.json())
    .then(obj => {
        sessionId = obj.message
        totalCartItems = obj.totalCartItems
    })

    if(sessionId === null) {
        document.getElementById("invalid_data").innerHTML = "Invalid username or password"
    }

    openOrCloseForm()
    showCartOrNo()
    document.getElementById("login-form").reset();
}

function openOrCloseForm() {
    if(sessionId === null || sessionId === "null") {
        document.getElementById("log-out").style.display = "none";
        document.getElementById("open-button").style.display = "block";
    } else {
        closeForm()
        document.getElementById("open-button").style.display = "none";
        document.getElementById("log-out").style.display = "block";
    }
}

window.onbeforeunload = function() {
    localStorage.setItem("username", username)
    sessionStorage.setItem("sessionId", sessionId)
}

const encryptWithAES = (text) => {
    const passphrase = '123';
    return CryptoJS.AES.encrypt(text, passphrase).toString();
};

function showCartOrNo() {
    let cartElement = document.getElementById("cart-section")
    document.getElementById("totalCartItems").innerHTML = totalCartItems;
    document.getElementById("cart-section")
    if(sessionId === null || sessionId === "null") {
        cartElement.style.display = "none"
    } else {
        cartElement.style.display = "flex"
    }
}