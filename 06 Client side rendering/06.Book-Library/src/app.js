import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';
import { html, render } from './utility.js';

const root = document.body;

const loadButton = html`<button @click = ${update} id="loadBooks">LOAD ALL BOOKS</button>`;

function update() {
    render([
        loadButton,
        showCatalog(context),
        showCreate(context),
        showUpdate(context)
    ], root)
};
const context = {
    update
};

const beginingTable = html`<table>
<thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
</tbody>
</table>`;

render([loadButton, beginingTable, showCreate(context)], root);

//update();
