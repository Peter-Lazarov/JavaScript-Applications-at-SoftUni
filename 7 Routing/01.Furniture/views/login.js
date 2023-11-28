import { html } from '../src/library.js';
import { login } from '../src/api/api.js';

const loginTemplate = (submitAction, errorMessage) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
    </div>
    <form @submit=${submitAction}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMessage ? html`<div class="form-group">${errorMessage}</div>` : null}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (errorMessage ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (errorMessage ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export function loginPage(context) {
    context.render(loginTemplate(submitAction));

    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if (email && password) {
                await login(email, password);
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
