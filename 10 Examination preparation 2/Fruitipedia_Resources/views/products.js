import { html } from "../src/library.js";
import { getMethod } from "../src/api/requestMethods.js";

const productTemplate = (product) => html`
<!-- Display a div with information about every post (if any)-->
<div class="fruit">
    <img src=${product.imageUrl} alt="example1" />
    <h3 class="title">${product.name}</h3>
    <p class="description">${product.description}</p>
    <a class="details-btn" href="/fruit/${product._id}/details">More Info</a>
  </div>`;

const catalogTemplate = (productsAll) => html`
    ${productsAll.length > 0 
        ? html`
            <!-- Dashboard page -->
            <h2>Fruits</h2>
            <section id="dashboard">
            ${productsAll}
            </section>`
        : html`
            <!-- Display an h2 if there are no posts -->
            <h2>No fruit info yet.</h2>`}`;

export async function productsView(context) {
    const products = await getMethod('/data/fruits?sortBy=_createdOn%20desc');
    let productsAll = [];
    if(products.length > 0){
        for (const product of products) {
            productsAll.push(productTemplate(product));
        }
    }

    context.render(catalogTemplate(productsAll));
}
