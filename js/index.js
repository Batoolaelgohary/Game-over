// ? =============> Global ===============>
const inputs = document.querySelectorAll('input');
const loginBtn = document.getElementById('login-btn');
const mode = document.getElementById('mode');

    
// ! =============> When Start ===============>
    if (localStorage.getItem('theme')!=null) {
    const theme = localStorage.getItem('theme');
    if( theme == 'light') {
        document.querySelector('#mode').classList.replace('fa-sun', 'fa-moon')
        document.documentElement.setAttribute('data-theme', 'light')
    }
    if (theme == 'dark') {
        document.querySelector('#mode').classList.replace('fa-moon', 'fa-sun')
        document.documentElement.setAttribute('data-theme', 'dark')
    }
}

// * =============> Events ===============>

    inputs[0].addEventListener('input', () => {
            emailValidtaion()
        })
    inputs[1].addEventListener('input', () => {
            passValidation()
    })
    loginBtn.addEventListener('click', () => {
            
    })
    document.forms[0].addEventListener('submit', (e) => {
        e.preventDefault();
        setForm()
    })
    mode.addEventListener('click', (e) => {
    if (mode.classList.contains('fa-sun')) {
        document.querySelector('#mode').classList.replace('fa-sun', 'fa-moon')
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme','light')
    } else {
        document.querySelector('#mode').classList.replace('fa-moon', 'fa-sun')
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme','dark')
        
    }
   })

// ! =============> Functions ===============>

function setForm() {
    const user = {
            email: inputs[0].value,
            password: inputs[1].value,
    }
    login(user)
}
      
async function login(userData) {
    loginBtn.innerHTML = "..."
    loginBtn.setAttribute('disabled','true')
        const api= await fetch(`https://movies-api.routemisr.com/signin`, {
        method:"post",
        body: JSON.stringify(userData),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
});
    const response = await api.json();
    console.log(response);
    
    if (response.message === 'success') {
        localStorage.setItem("token", response.token);
        location.href = './../Home.html';
        loginBtn.innerHTML = "Login";
    } else {
        document.getElementById('error').innerHTML = response.message;
        loginBtn.innerHTML = "Login";
        loginBtn.removeAttribute('disabled')
    }
    }

//  =============> Validation ===============>

function emailValidtaion() {
    
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let check =inputs[0].value;
    if(regexMail.test(check)){

        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        document.getElementById("email").classList.add('d-none')
        return true
    }
    else{
        inputs[0].classList.remove("is-valid");
        inputs[0].classList.add("is-invalid");
        document.getElementById("email").classList.remove('d-none')
        return false
    }
}


function passValidation(){
    let regexPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let check=inputs[1].value;
    if(regexPass.test(check)){
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        document.getElementById("password").classList.add('d-none')
        return true
    }
    else{
        inputs[1].classList.remove("is-valid");
        inputs[1].classList.add("is-invalid");
        document.getElementById("password").classList.remove('d-none')
        return false
    }
}