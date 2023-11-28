import { getAllItems, getMyItems} from '../src/api/data.js';
import { html, until } from '../src/library.js';

const catalogTemplate = (itemPromise, userPage) => html`     
<div class="row space-top">
    <div class="col-md-12">
        ${userPage ? html`
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>` 
    : html `<h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>`}
    </div>
</div>
<div class="row space-top">
    ${until(itemPromise, html`<p>Loading &hellip;</p>`)}
</div>`;

const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src=${item.img} />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${item._id}" class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
</div>`;

export function catalogPage(context) {
    const userPageFromPathname = context.pathname == '/my-furniture';
    context.render(catalogTemplate(loadItems(userPageFromPathname), userPageFromPathname));
}

export async function loadItems(userPage){
    let items = [];

    if(userPage){
        const userId = JSON.parse(sessionStorage.getItem('user'))._id;
        items = await getMyItems(userId);
    }else{
        items = await getAllItems();
    }
    
    return await items.map(itemTemplate);
}
