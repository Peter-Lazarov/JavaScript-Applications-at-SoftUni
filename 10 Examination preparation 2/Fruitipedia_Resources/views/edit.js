import { editItem, getMethod } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";
//import { createItem } from "../src/api/requestMethods.js";

const editProductTemplate = (submitAction, product) => html`       
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <h2>Edit Fruit</h2>
    <form @submit = ${submitAction} class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Fruit Name"
        .value=${product.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        placeholder="Fruit Image URL"
        .value=${product.imageUrl}
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${product.description}
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
        .value=${product.nutrition}
      ></textarea>
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editProductView(context){
    const productId = context.params.id
    const product = await getMethod(`/data/fruits/${productId}`);

    context.render(editProductTemplate(submitAction, product));

    function submitAction(event) {
        event.preventDefault();

        const formDataAsObject = new FormData(event.target);

        const name = formDataAsObject.get('name');
        const imageUrl = formDataAsObject.get('imageUrl');
        const description = formDataAsObject.get('description');
        const nutrition = formDataAsObject.get('nutrition');

        //const formData = [...formDataAsObject.entries()];
        //const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
        //const missing = formData.filter(([k, v]) => k != 'material' && v == '');

        try {
            // if (missing.length > 0) {
            //     throw new Error('Please fill all mandatory fields!');
            // }

            if(!name || !imageUrl || !description || !nutrition){
              throw new Error('Please fill all mandatory fields!');
            }

            const data = {
              name,
              imageUrl,
              description,
              nutrition
            }

            editItem(productId, data);
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
