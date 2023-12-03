import { getMethod, postMethod, deleteItem } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";

const detailsTemplate = (product, buttonsHTMLResult, boughtCount) => html`
    <!-- Details page -->
    <section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${product.imageUrl}" alt="example1" />
        <p id="details-title">${product.name}</p>
            <p id="details-category">
            Category: <span id="categories">${product.category}</span>
            </p>
        <p id="details-price">
        Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${boughtCount}</span> times.</h4>
                <span
                >${product.description}</span
                >
            </div>
        </div>

        ${buttonsHTMLResult}
    </div>
    </section>`;

export async function detailsView(context){
    const productId = context.params.id;
    const product = await getMethod(`/data/products/${productId}`);

    const userData = context.user(); //localStorage.getItem('user'));
    let isUser = userData != null;
    let isOwner = false;
    let buttonsHTMLResult = html``;
    
    let currentUserBoughtsOfProduct = 0;
    
    const productWithId = {
        productId: productId
    }
    
    if(isUser){
        isOwner = userData._id == product._ownerId;
        currentUserBoughtsOfProduct = await getMethod(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userData._id}%22&count`);

        if(isOwner){
            buttonsHTMLResult = html`
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                <a href=${`/products/${product._id}/edit`} id="edit-btn">Edit</a>
                <a @click = ${deleteAction} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
            
        }else if(isUser && currentUserBoughtsOfProduct == 0){
            buttonsHTMLResult = html`
            <div id="action-buttons">
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="javascript:void(0)" id="buy-btn" @click = ${buyButtonMechanics}>Buy</a>
            </div>`
        }
    }

    let productBoughtsCount = await getMethod(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);

    async function buyButtonMechanics(){
        const postResponse = await postMethod('/data/bought', productWithId);
        //document.querySelector('a#buy-btn').style.display = 'none';
        productBoughtsCount = await getMethod(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
        context.render(detailsTemplate(product, '', productBoughtsCount));
    }

    async function deleteAction(){
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteItem(context.params.id);
            context.page.redirect('/');
        }
    }
    
    context.render(detailsTemplate(product, buttonsHTMLResult, productBoughtsCount));
}
