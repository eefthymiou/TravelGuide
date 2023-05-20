const maro = {id: 1, username: "maro", email: "marosimosi@gmail.com", password: "12345678"};
const john = {id: 2, username: "efthymiou", email: "johnefthimiou1002@gmail.com", password: "12345678"}; //admin
const users = [maro, john];

function emailExists(email){
    if (users.find(user => user.email === email)) {
        return users.find(user => user.email === email).id;
    } else {
        return false;
    }
};

function isEmail(email) {   // email format
    let format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(format)) {
        return true;
    } else {
        return false;
    } 
};

function isUserName(username){  // username format
    let format = /^[a-zA-Z0-9._-]{3,16}$/;
    if (username.match(format)) {
        return true;
    }
    else {
        return false;
    }
};

function okPassword(password){      // password format
    if (password.length >= 8 && password.match(/[0-9]/)) {   //  > 8 characters and at least 1 number
        return true;
    } else {
        return false;
    }
};

function samePassword(password, passwordConfirm){       // password confirmation
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};


// if form has 2 inputs, it's a sign in form
// else, it's a sign up form
export async function authentication(req, res) {
    const bodyKeys = Object.keys(req.body);
    const bodyLength = bodyKeys.length;
    if (bodyLength == 2) {
        signIn(req, res);
    } else {
        signUp(req, res);
    }
}

function signIn(req, res) {
    let error = false;
    let message = "";
    let email = req.body.signInEmail;
    let password = req.body.signInPassword;
    const user = users.find(user => user.email === email);
    if (user && user.password === password) {
        // create session
        let error = false;
        let message = "";
        console.log("Welcome " + user.username);
    } else {
        message = "Λάθος email ή κωδικός.";
        error = true;
    }
    try{
        res.render('mainpage', {style: 'mainpage.css', signInError: error, signInEmail: email, signInPassword: password, signInMessage: message});
    }
    catch (err) {
        res.send(err);
    }
}


function signUp(req, res) {
    let error = false;
    let usernameMsg = "";
    let emailMsg = "";
    let passwordMsg = "";
    let confirmMsg = "";
    let username = req.body.username;
    let signUpEmail = req.body.signUpEmail;
    let signUpPassword= req.body.signUpPassword;
    let confirmPassword = req.body.confirmPassword;
    if (!isUserName(username)) { usernameMsg = "Το username δεν είναι έγκυρο."; error=true;}
    if (emailExists(signUpEmail)) { emailMsg = "Το email χρησιμοποιείται ήδη."; error=true;}
    if(!isEmail(signUpEmail)){ emailMsg = "Το email δεν είναι έγκυρο"; error=true; }
    if(!okPassword(signUpPassword)){ passwordMsg = "Χρησιμοποιήστε τουλάχιστον 8 χαρακτήρες και τουλάχιστον έναν αριθμό."; error=true;}
    if(!samePassword(signUpPassword, confirmPassword)){ confirmMsg = "Οι κωδικοί δεν ταιριάζουν."; error=true;}
    if(!error){
        // add user to database
        // create session
        usernameMsg = ""; emailMsg = ""; passwordMsg = ""; confirmMsg = "";
        username = ""; signUpEmail = ""; signUpPassword = ""; confirmPassword = "";
    }
    try{
        res.render('mainpage', {style: 'mainpage.css' ,signUpError:error, 
        signUpUsername:username, signUpEmail: signUpEmail, signUpPassword: signUpPassword, confirmPassword: confirmPassword,
        usernameMessage: usernameMsg, emailMessage: emailMsg, passwordMessage: passwordMsg, confirmMessage: confirmMsg});
    } catch (err) {
        res.send(err);
    }

}