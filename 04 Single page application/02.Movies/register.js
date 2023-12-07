import { navigationCare, showView } from "./util.js";
import { homePage } from "./home.js";

export function registerPage() {
    showView('#form-sign-up');
}

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', registerAction);

async function registerAction(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('repeatPassword');

    try {
        if (email && password && password === rePassword) {

            const response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));

            homePage();
            navigationCare();
        } else {
            throw new Error("Fill properly fields.");
        }
    } catch (error) {
        alert(error.message);
    }
}
