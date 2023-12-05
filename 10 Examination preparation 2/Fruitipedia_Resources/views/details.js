import { getMethod, postMethod, deleteItem } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";

const detailsTemplate = (product, isCreator, deleteAction) => html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${product.imageUrl} alt="example1" />
            <p id="details-title">${product.name}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p>${product.description}</p>
                    <p id="nutrition">Nutrition</p>
                    <p id="details-nutrition">${product.nutrition}</p>
                </div>
                ${isCreator ? html`
                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href=${`/fruit/${product._id}/details/edit`} id="edit-btn">Edit</a>
                    <a @click = ${deleteAction} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>` 
                : ``}
            </div>
        </div>
    </section>`;

export async function detailsView(context){
    const productId = context.params.id;
    const product = await getMethod(`/data/fruits/${productId}`);

    const userData = context.user(); //localStorage.getItem('user'));
    let isUser = userData != null;
    let isCreator = false;
    if(isUser){
        isCreator = userData._id == product._ownerId;
    }
    
    async function deleteAction(){
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteItem(context.params.id);
            context.page.redirect('/');
        }
    }
    
    context.render(detailsTemplate(product, isCreator, deleteAction));
}
