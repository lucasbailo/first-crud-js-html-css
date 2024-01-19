
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = form.email().value
    if (!email) {
        return false;
    }
    return validateEmail(email);

}

function isPasswordValid() {
    const password = form.password().value;

    if (!password) {
        return false;
    }
    return true;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block"
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-invalid-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
            form.email().value, form.password().value
        ).then(response => {
            hideLoading()
            window.location.href = "pages/home/home.html"
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error))
    });
}

function register() {
    window.location.href = "pages/register/register.html"
}


function getErrorMessage(error){
    if (error.code == "auth/invalid-credential") {
        return "Invalid credentials";
    } else if(error.code == "auth/user-not-found") {
        return "User not found";
    } else if(error.code == "auth/wrong-password"){
        console.log(error.code)
        return "Wrong Password";
    } else if (error.code == "auth/too-many-requests"){
        return "Too many requests, try again later!"; 
    } else {
        return error.message;
    }
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert("The recovery email was sent successfully")
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error))
    })
}