import { getOneItemById, deleteItem } from '../src/api/data.js';
import { html } from '../src/library.js';

const detailsTemplate = (item, owner, deleteAction) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${owner ? html`<div>
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a @click = ${deleteAction} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
</div>`;

export async function detailsPage(context) {
    async function deleteAction(){
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteItem(context.params.id);
            context.page.redirect('/');
        }
    }

    const item = await getOneItemById(context.params.id);
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if(userData){
        const owner = userData._id == item._ownerId;
        context.render(detailsTemplate(item, owner, deleteAction));
    }else{
        context.render(detailsTemplate(item, false, deleteAction));
    }
}
