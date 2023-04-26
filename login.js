let emails = ["marosimosi@gmail.com", "johnefthimiou1002@gmail.com"]
let passwords = ["12345678", "12345678"]

function emailExists(email){
    if (emails.includes(email)){
        return emails.indexOf(email)+1;
    } else {
        return false;
    }
}

//  ------SIGN UP FORM VALIDATION------
function isEmail() {   // email format
    let email = document.getElementById("signUpEmail").value;
    let format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(format)) {
        return true;
    } else {
        return false;
    } 
};

function isUserName(){  // username format
    let username = document.getElementById("username").value;
    let format = /^[a-zA-Z0-9._-]{3,16}$/;
    if (username.match(format)) {
        return true;
    }
    else {
        return false;
    }
};

function okPassword(){      // password format
    let password = document.getElementById("signUpPassword").value;
    if (password.length >= 8 && password.match(/[0-9]/)) {   //  > 8 characters and at least 1 number
        return true;
    } else {
        return false;
    }
};

function samePassword(){       // password confirmation
    let password = document.getElementById("signUpPassword").value;
    let passwordConfirm = document.getElementById("confirmPassword").value;
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};

let signUpButton = document.getElementById("signUpButton");
let emailMessage = document.getElementById("emailMessage");
signUpButton.addEventListener("click", function(event){
    event.preventDefault();
    let email = document.getElementById("signUpEmail").value;
    if (isEmail() && isUserName() && okPassword() && samePassword()){
        TODO 
        //successfull sign up
    }
    else{
        if (emailExists(email)) {
            signUpEmail.style.border = "2px solid rgb(210, 17, 17)";
            emailMessage.textContent = "Το email χρησιμοποιείται ήδη.";
        }
        else {
            emailMessage.textContent = "";
        }
        if (!isEmail()) signUpEmail.style.border = "2px solid rgb(210, 17, 17)";
        else if (!emailExists(email) && isEmail()) signUpEmail.style.border = "1px solid #ced4da";
        if (!isUserName()) username.style.border = "2px solid rgb(210, 17, 17)";
        else username.style.border = "1px solid #ced4da";
        if (!okPassword()) signUpPassword.style.border = "2px solid rgb(210, 17, 17)";
        else signUpPassword.style.border = "1px solid #ced4da";
        if (!samePassword()) confirmPassword.style.border = "2px solid rgb(210, 17, 17)";
        else confirmPassword.style.border = "1px solid #ced4da";
    }
});

let password = document.getElementById("signUpPassword");
passwordMessage = document.getElementById("passwordMessage");
password.addEventListener("input",function(event) {
    if (!okPassword()) {
        passwordMessage.textContent = "Χρησιμοποιήστε τουλάχιστον 8 χαρακτήρες και τουλάχιστον έναν αριθμό.";
    }
    else{
        passwordMessage.textContent = "";
    }
});
password.addEventListener("blur", function(event) {
    passwordMessage.textContent = "";
});


// ------SIGN IN FORM VALIDATION------
let signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", function(event){
    event.preventDefault();
    let email = document.getElementById("signInEmail").value;
    let password = document.getElementById("signInPassword").value;
    if (!emailExists(email) || (emailExists(email) && password !== passwords[emailExists(email)-1])){
        signInEmail.style.border = "2px solid rgb(210, 17, 17)";
        signInPassword.style.border = "2px solid rgb(210, 17, 17)";
    }
    else {
        TODO
        //successfull sign in
    }
});



const buttons = document.getElementById("navbarButton");
// ------NAVBAR FOR GUEST------
// const signIn = document.createElement("button");
// signIn.setAttribute("class", "btn btn-outline-light");
// signIn.setAttribute("data-bs-toggle", "modal");
// signIn.setAttribute("data-bs-target", "#sign-in-modal");
// signIn.textContent = "Συνδεθείτε";
// signIn.style.marginRight = "10px";
// buttons.appendChild(signIn);

// const signUp = document.createElement("button");
// signUp.setAttribute("class", "btn btn-outline-light");
// signUp.setAttribute("data-bs-toggle", "modal");
// signUp.setAttribute("data-bs-target", "#sign-up-modal");
// signUp.textContent = "Εγγραφείτε";
// buttons.appendChild(signUp);

// ------NAVBAR FOR USER------
const user = document.createElement("span");
user.setAttribute("class", "navbar-text");
user.textContent = "Username";
user.style.marginRight = "20px";
user.style.fontSize = "1.1rem";
buttons.appendChild(user);

const signOut = document.createElement("button");
signOut.setAttribute("class", "btn btn-outline-light");
signOut.textContent = "Αποσύνδεση";
buttons.appendChild(signOut);




