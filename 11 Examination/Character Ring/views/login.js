import { html } from '../src/library.js';
import { loginRequest } from '../src/api/requestMethods.js';

//template
const loginTemplate = (submitAction, errorMessage) => html`
<!-- Login Page (Only for Guest users) -->
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit = ${submitAction} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
            Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

//render
export function loginView(context){
    context.render(loginTemplate(submitAction));

    async function submitAction(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if (email && password) {
                await loginRequest(email, password);
                //context.updateNavigation();
                event.target.reset();
                context.page.redirect('/');
            }else{
                const error = new Error('Email and password are required');
                // context.render(loginTemplate(submitAction, error));
                window.alert(error.message);
            }
        } catch (error) {
            //context.render(loginTemplate(submitAction, error.message));
            window.alert(error.message);
        }
    }
}
