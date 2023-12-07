const registerPageDiv = document.getElementById("registerPage");
const form = registerPageDiv.querySelector('form');
form.addEventListener('submit', submitAction);
const url = '/users/register';

import { postMethod } from "./application.js"
import { goTo, updateNavigation } from "./navigation.js";

export function showRegister(replaceFunction){
    replaceFunction(registerPageDiv);
}

export async function register(email, password, repeatPassword){
    if(email && password && password == repeatPassword){
        const loginData = {
            email: email,
            password: password
        }

        const user = await postMethod(url, loginData);
        localStorage.setItem('user', JSON.stringify(user));
    }else{
        alert("All fields are required");
    }
}

async function submitAction(event){
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    await register(email, password, repeatPassword);
    
    updateNavigation();
    goTo('/');
}
