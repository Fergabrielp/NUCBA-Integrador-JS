const loginForm = document.querySelector('.login-form')
const errorMsg = document.querySelector('.error-msg')

const saveRegisterLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const registerSuccess = (email, password) => {
    swal("Account was succesfuly created", {
        buttons: false,
        icon: "success",
        timer: 1600,
    });
    saveRegisterLocalStorage("emailReg", email)
    saveRegisterLocalStorage("passwordReg", password)
    setTimeout(() => {
        window.location.href = "/pages/login.html";
    }, 1700);
}

const renderError = msg => {
    errorMsg.innerHTML = msg
    setTimeout(() => {
        errorMsg.innerHTML = ""
    }, 3000);
}

const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const rePassword = e.target[2].value;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (email === "" || password === "" || rePassword === "") {
        renderError("Fields can't be empty")
        return;
    }

    if (email !== "" && !regexEmail.test(email)) {
        renderError("Incorrect email")
        return;
    }

    if (password !== "" && !regexPass.test(password)) {
        renderError("Password needs at least 6 alphanumeric characters")
        return;
    }

    if (password !== rePassword) {
        renderError("Passwords must match")
        return;
    }

    registerSuccess(email, password)

};


loginForm.addEventListener('submit', handleSubmit)