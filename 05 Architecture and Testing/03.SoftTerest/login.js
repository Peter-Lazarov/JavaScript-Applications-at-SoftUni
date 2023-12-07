const loginPageDiv = document.getElementById("loginPage");
const form = loginPageDiv.querySelector('form');
form.addEventListener('submit', submitAction);

const url = '/users/login';

export function showLogin(replaceFunction){
    replaceFunction(loginPageDiv);
}

import { postMethod } from "./application.js"
import { goTo, updateNavigation} from "./navigation.js";

export async function login(email, password){
    if(email && password){
        const loginData = {
            email: email,
            password: password
        }

        const user = await postMethod(url, loginData);
        localStorage.setItem('user', JSON.stringify(user));
    }
}

async function submitAction(event){
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    await login(email, password);
    
    updateNavigation();
    goTo('/');
}
