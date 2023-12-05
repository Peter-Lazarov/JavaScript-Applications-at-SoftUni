import { html } from "../src/library.js";
import { createItem } from "../src/api/requestMethods.js";

const addProductTemplate = (submitAction) => html`        
<!-- Create Page (Only for logged-in users) -->
<section id="create">
  <div class="form">
    <h2>Add Fruit</h2>
    <form @submit = ${submitAction} class="create-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Fruit Name"
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        placeholder="Fruit Image"
      />
      <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    ></textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
    ></textarea>
      <button type="submit">Add Fruit</button>
    </form>
  </div>
</section>`;

export function addProductView(context){
    context.render(addProductTemplate(submitAction));

    async function submitAction(event) {
        event.preventDefault();

        const formDataAsObject = new FormData(event.target);
        const formData = [...formDataAsObject.entries()];

        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k.trim()]: v.trim() }), {});

        const missing = formData.filter(([k, v]) => k != 'material' && v == '');

        try {
            if (missing.length > 0) {
                throw new Error('Please fill all mandatory fields!');
            }

            data.price = data.price;

            await createItem(data);
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
