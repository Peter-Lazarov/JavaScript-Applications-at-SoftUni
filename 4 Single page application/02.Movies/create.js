import { showView } from "./util.js";
import { homePage } from "./home.js";

const form = document.querySelector('form');
form.addEventListener('submit', addAction);

export function createPage(){
    showView('#add-movie');
}

async function addAction(event){
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img')

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({title, description, img})
    });

    form.reset();
    homePage();
}
