import { html } from '../src/library.js';
import { registerRequest } from '../src/api/requestMethods.js';

const registerTemplate = (submitAction, errorMessage) => html`
    <!-- Register Page (Only for Guest users) -->
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit = ${submitAction} class="register-form">
                <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
                />
                <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
                />
                <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
                />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
        </div>
    </section>`;

export function registerView(context) {
    context.render(registerTemplate(submitAction, null));

    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('re-password');

        try {
            if (email == '' || password == '') {
                // throw {
                //     fieldsError: new Error('All fields are required!'),
                //     fieldsStatus: {
                //         email: email == '',
                //         password: password == '',
                //         repeatPassword: repeatPassword == ''
                //     }
                // }
                throw new Error('All fields are required!');
            }

            if (password != repeatPassword) {
                // throw {
                //     fieldsError: new Error("Passwords don\'t match!"),
                //     fieldsStatus: {
                //         password: true,
                //         repeatPassword: true
                //     }
                // }
                throw new Error('Passwords don\'t match!');
            }

            await registerRequest(email, password);
            //context.updateNavigation();
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            // const message = error.message || error.fieldsError.message;
            // const fields = error.fieldsStatus || {};
            // context.render(registerTemplate(submitAction, message, fields));
            window.alert(error.message);
        }
    }
}
