import { html, render } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';

export {
    html,
    render,
    until
};

const host = 'http://localhost:3030/jsonstore/collections';

async function request(url, method = 'get', data) {
    const oprions = {
        method,
        headers: {}
    };

    if (data != undefined) {
        oprions.headers['Content-Type'] = 'application/json';
        oprions.body = JSON.stringify(data);
    }

    const response = await fetch(host + url, oprions);

    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    return await response.json();
}

export async function getAllBooks() {
    return await request('/books');
}

export async function getOneBook(id) {
    return await request('/books/' + id);
}

export async function createBook(book) {
    return await request('/books', 'post', book);
}

export async function updateBook(id, book) {
    return await request('/books/' + id, 'put', book);
}

export async function deleteBook(id) {
    return await request('/books/' + id, 'delete');
}
