import {html, render, updateBook} from './utility.js';

const updateTemplate = (book, context) => html`
<form @submit = ${event => submitAction(event, context)} id="edit-form">
    <input type="hidden" name="id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;

export function showUpdate(context){
    if(context.book == undefined){
        return null;
    }else{
        return updateTemplate(context.book, context);
    }
}

async function submitAction(event, context){
    event.preventDefault();
    const formData = new FormData(event.target);

    const id = formData.get('id');
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    const result = await updateBook(id, {title, author});

    event.target.reset();
    delete context.book;
    context.update();
}
