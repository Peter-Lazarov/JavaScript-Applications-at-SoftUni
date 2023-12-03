import { html } from "../src/library.js";
import { getMethod } from "../src/api/requestMethods.js";

const productTemplate = (product) => html`
    <!-- Display a div with information about every post (if any)-->
    <div class="product">
        <img src=${product.imageUrl} alt="example1" />
        <p class="title">${product.name}</p>
        <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
        <a class="details-btn" href="/products/${product._id}/details">Details</a>
    </div>`;

const catalogTemplate = (productsAll) => html`
    ${productsAll.length > 0 ? html`
        <!-- Dashboard page -->
        <h2>Products</h2>
        <section id="dashboard">
            ${productsAll}
        </section>`
        : html`
        <!-- Display an h2 if there are no posts -->
        <h2>No products yet.</h2>`
    }`;

export async function productsView(context) {
    const products = await getMethod('/data/products?sortBy=_createdOn%20desc');
    let productsAll = [];
    if(products.length > 0){
        for (const product of products) {
            productsAll.push(productTemplate(product));
        }
    }

    context.render(catalogTemplate(productsAll));
}
