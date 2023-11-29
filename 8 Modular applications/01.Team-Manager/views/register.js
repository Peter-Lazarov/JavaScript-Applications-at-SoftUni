import { html } from '../src/library.js';
import { registerRequest } from '../src/api/requestMethods.js';

const registerTemplate = (submitAction, errorMessage, errorFields) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${submitAction} id="register-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;

export function registerPage(context) {
    context.render(registerTemplate(submitAction, null, {}));

    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repass');

        try {
            if (email == '' || password == '') {
                throw {
                    fieldsError: new Error('All fields are required!'),
                    fieldsStatus: {
                        email: email == '',
                        password: password == '',
                        repeatPassword: repeatPassword == ''
                    }
                }
            }

            if (password != repeatPassword) {
                throw {
                    fieldsError: new Error("Passwords don\'t match!"),
                    fieldsStatus: {
                        password: true,
                        repeatPassword: true
                    }
                }
            }

            await registerRequest(email, password);
            context.updateNavigation();
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            const message = error.message || error.fieldsError.message;
            const fields = error.fieldsStatus || {};
            context.render(registerTemplate(submitAction, message, fields));
        }
    }
}
