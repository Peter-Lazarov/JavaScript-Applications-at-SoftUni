import { html } from '../src/library.js';
import { register } from '../src/api/api.js';

const registerTemplate = (submitAction, errorMessage, errorFields) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submitAction}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMessage ? html`<div class="form-group">${errorMessage}</div>` : null}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (errorFields.email ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (errorFields.password ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${'form-control' + (errorFields.repeatPassword ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export function registerPage(context) {
    context.render(registerTemplate(submitAction, null, {}));

    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('rePass');

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

            await register(email, password);
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
