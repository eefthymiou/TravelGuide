import session from "express-session";
const model = await import('../model/mongodb/mongodb.mjs');

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

async function signIn(req, res) {
    let error = false;
    let message = "";
    let email = req.body.signInEmail;
    let password = req.body.signInPassword;
    let userId = await model.userExists(email,password);
    if (userId != null) {
        req.session.user = userId; // assign the user ID to the session
        req.session.username = await model.getUsername(userId);
        console.log("session user:", req.session.username);
        let error = false;
        let message = "";
        email = ""; password = "";
    } else {
        message = "Λάθος email ή κωδικός.";
        error = true;
    }
    try{
        res.render('mainpage', {username:req.session.username, style: 'mainpage.css', signInError: error, signInEmail: email, signInPassword: password, signInMessage: message});
    }
    catch (err) {
        res.send(err);
    }
}


async function signUp(req, res) {
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
    if (await model.emailExists(signUpEmail)) { emailMsg = "Το email χρησιμοποιείται ήδη."; error=true;}
    if(!isEmail(signUpEmail)){ emailMsg = "Το email δεν είναι έγκυρο"; error=true; }
    if(!okPassword(signUpPassword)){ passwordMsg = "Χρησιμοποιήστε τουλάχιστον 8 χαρακτήρες και τουλάχιστον έναν αριθμό."; error=true;}
    if(!samePassword(signUpPassword, confirmPassword)){ confirmMsg = "Οι κωδικοί δεν ταιριάζουν."; error=true;}
    if(!error){
        // add user to database
        let userId = await model.addUser(username, signUpEmail, signUpPassword);
        // assign the user ID to the session
        req.session.user = userId;
        console.log("session user:", req.session.user);
        usernameMsg = ""; emailMsg = ""; passwordMsg = ""; confirmMsg = "";
        username = ""; signUpEmail = ""; signUpPassword = ""; confirmPassword = "";
    }
    try{
        res.render('mainpage', {username:req.session.username, style: 'mainpage.css' ,signUpError:error, 
        signUpUsername:username, signUpEmail: signUpEmail, signUpPassword: signUpPassword, confirmPassword: confirmPassword,
        usernameMessage: usernameMsg, emailMessage: emailMsg, passwordMessage: passwordMsg, confirmMessage: confirmMsg});
    } catch (err) {
        res.send(err);
    }   
}