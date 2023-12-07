import { html, render, until, getAllBooks, deleteBook } from './utility.js';

const catalogTemplate = (booksPromise) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${until(booksPromise, html`<tr><td colSpan="3">Loading&hellip;</td></tr>`)}
        
    </tbody>
</table>`;

const bookRow = (book, editAction, deleteAction) => html`<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click = ${editAction}>Edit</button>
        <button @click = ${deleteAction}>Delete</button>
    </td>
</tr>`;

export function showCatalog(context) {
    return catalogTemplate(loadAllBooks(context));
}

async function loadAllBooks(context){
    const data = await getAllBooks();

    const books = Object.entries(data).map(([k, v]) => Object.assign(v, {_id: k}));

    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book, context), deleteAction.bind(null, book._id, context)));
}

function toggleEditor(book, context){
    context.book = book;
    context.update();
}

async function deleteAction(id, context){
    await deleteBook(id);
    context.update();
}
