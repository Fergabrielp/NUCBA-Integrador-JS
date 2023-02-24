const loginForm = document.querySelector('.login-form')
const errorMsg = document.querySelector('.error-msg')

const correctEmail = JSON.parse(localStorage.getItem('emailReg')) || ""
const correctPass = JSON.parse(localStorage.getItem('passwordReg')) || ""

const loggingSuccesss = (boolean) => {
    localStorage.setItem('logged', boolean);

    swal("Logged, redirecting to Home...", {
        buttons: false,
        icon: "success",
        timer: 2000,
    });

    setTimeout(() => {
        window.location.href = "/index.html";
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
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email === "" || password === "") {
        renderError("Fields can't be empty")
        return;
    }

    if (email !== "" && !regex.test(email)) {
        renderError("Incorrect email")
        return;
    }

    if (email !== correctEmail || password !== correctPass) {
        renderError("Incorrect password or email")
        return;
    }

    loggingSuccesss(true)

};


loginForm.addEventListener('submit', handleSubmit)