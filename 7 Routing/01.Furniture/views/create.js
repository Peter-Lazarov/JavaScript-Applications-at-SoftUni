import { html } from '../src/library.js';
import { createItem } from '../src/api/data.js';

const createTemplate = (submitAction, errorMessage, errorFields) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submitAction}>
    ${errorMessage ? html`<div class="form-group error">${errorMessage}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (errorFields.make ? ' is-invalid' : '')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (errorFields.model ? ' is-invalid' : '')} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (errorFields.year ? ' is-invalid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (errorFields.description ? ' is-invalid' : '')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (errorFields.price ? ' is-invalid' : '')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (errorFields.img ? ' is-invalid' : '')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

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
