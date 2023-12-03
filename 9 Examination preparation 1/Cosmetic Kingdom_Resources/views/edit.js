import { editItem, getMethod } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";
//import { createItem } from "../src/api/requestMethods.js";

const editProductTemplate = (submitAction, product) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Product</h2>
            <form @submit = ${submitAction} class="edit-form">
                <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${product.name}
                />
                <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${product.imageUrl}
                />
                <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${product.category}
                />
                <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${product.description}
                ></textarea>
                
                <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${product.price}
                />
                <button type="submit">post</button>
            </form>
        </div>
    </section>`;

export async function editProductView(context){
    const product = await getMethod(`/data/products/${context.params.id}`);

    context.render(editProductTemplate(submitAction, product));

    async function submitAction(event) {
        event.preventDefault();

        const formDataAsObject = new FormData(event.target);
        const formData = [...formDataAsObject.entries()];

        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        const missing = formData.filter(([k, v]) => k != 'material' && v == '');

        try {
            if (missing.length > 0) {
                throw new Error('Please fill all mandatory fields!');
            }

            data.price = data.price;

            await editItem(context.params.id, data);
            event.target.reset();
            context.page.redirect('/');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
