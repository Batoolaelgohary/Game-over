// ? =============> Global ===============>
const inputs = document.querySelectorAll('input');
const signUpBtn = document.getElementById('signup-btn');
const formData = document.querySelector('form');
let isValid = false;
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
        fnameValidation()
    })
inputs[1].addEventListener('input', () => {
        lnameValidation()
    })
inputs[2].addEventListener('input', () => {
        emailValidtaion()
    })
inputs[3].addEventListener('input', () => {
        passValidation()
    })
inputs[4].addEventListener('input', () => {
        ageValidation()
})

formData.addEventListener('submit', (e) => {
    e.preventDefault();
    if (fnameValidation() && lnameValidation() && emailValidtaion() && passValidation() && ageValidation()) {
        setForm()
    } else {
        document.getElementById('error').innerHTML ='Please enter a valid data'
    }
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
    signUpBtn.innerHTML = "..."
        const user = {
        first_name:inputs[0].value,
        last_name:inputs[1].value,
        email:inputs[2].value,
        password:inputs[3].value,
        age:inputs[4].value,
        }
        console.log(user);
        signUp(user)
    }

async function signUp(userData) {
    signUpBtn.innerHTML = "..."
    signUpBtn.setAttribute('disabled','true')
    const api = await fetch(`https://movies-api.routemisr.com/signup`, {
        method: 'post',
        body: JSON.stringify(userData),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const response = await api.json();
    console.log(response);
    if (response.message === 'success') {
        localStorage.setItem("token", response.token);
        location.href='./Home.html'
    } else {
        document.getElementById('error').innerHTML = response.errors.email.message;
        signUpBtn.innerHTML = "Sign up"
        signUpBtn.removeAttribute('disabled')
    }
}


//  =============> Validation ===============>
    function fnameValidation(){ 
    const regexfName = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    let check=inputs[0].value;
    if(regexfName.test(check)){
        document.getElementById("name").classList.add("d-none")
        return true
    }else{
        document.getElementById("name").classList.remove("d-none")
        return false
    }
}

function lnameValidation(){
    
    const regexlName = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    let check =inputs[1].value;
    if(regexlName.test(check)){
        document.getElementById("name").classList.add('d-none')
        return true
    }
    else{
        document.getElementById("name").classList.remove('d-none')
        return false
    }

}

function emailValidtaion() {
    
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let check =inputs[2].value;
    if(regexMail.test(check)){

        document.getElementById("email").classList.add('d-none')
        return true
    }
    else{
        document.getElementById("email").classList.remove('d-none')
        return false
    }
}


function passValidation(){
    let regexPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let check=inputs[3].value;
    if(regexPass.test(check)){
        document.getElementById("password").classList.add('d-none')
        return true
    }
    else{
        document.getElementById("password").classList.remove('d-none')
        return false
    }
}
function ageValidation(){
    let regexPass=/^(1[89]|[2-5][0-9]|60)$/;
    let check=inputs[4].value;
    if(regexPass.test(check)){
        document.getElementById("age").classList.add('d-none')
        return true
    }
    else{
        document.getElementById("age").classList.remove('d-none')
        return false
    }
}