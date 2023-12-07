import { homePage } from "./home.js";
import { navigationCare, showView } from "./util.js";

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', loginAction);

export function loginPage(){
    showView('#form-login');
}

async function loginAction(event){
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    try{
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));

        homePage();
        navigationCare();
    }catch (error){
        alert(error.message);
    }
}

export function logoutAction(){
    localStorage.removeItem('user');
    navigationCare();
    //alert('logged out');
}
