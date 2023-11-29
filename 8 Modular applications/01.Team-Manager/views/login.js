import { html } from '../src/library.js';
import { loginRequest } from '../src/api/requestMethods.js';

//template
const loginTemplate = (submitAction, errorMessage) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${submitAction} id="login-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;

//render
export function loginPage(context){
    context.render(loginTemplate(submitAction));

    async function submitAction(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if (email && password) {
                await loginRequest(email, password);
                context.updateNavigation();
                event.target.reset();
                context.page.redirect('/');
            }else{
                const error = new Error('Email and password are required');
                context.render(loginTemplate(submitAction, error));
            }
        } catch (error) {
            context.render(loginTemplate(submitAction, error.message));
        }
    }
}
