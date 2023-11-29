import { html } from '../src/library.js';
import { registerRequest } from '../src/api/requestMethods.js';

const createTemplate = (submitAction, errorMessage, errorFields) => html`
`;

export function createPage(context) {
    context.render(createTemplate(submitAction, null, {}));

    async function submitAction(event) {
        event.preventDefault();

        const formDataAsObject = new FormData(event.target);
        const formData = [...formDataAsObject.entries()];

        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        const missing = formData.filter(([k, v]) => k != 'material' && v == '');

        try {
            if (missing.length > 0) {
                const fieldsStatus = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {});
                console.log(fieldsStatus);
                throw {
                    fieldsError: new Error('Please fill all mandatory fields!'),
                    fieldsStatus
                }
            }

            data.year = Number(data.year);
            data.price = Number(data.price);

            await createItem(data);
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            const message = error.message || error.fieldsError.message;
            const fields = error.fieldsStatus || {};
            context.render(createTemplate(submitAction, message, fields));
        }
    }
}
