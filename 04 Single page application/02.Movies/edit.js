import { showView } from "./util.js";
import { homePage } from "./home.js";

export function editPage(movie){
    showView('#edit-movie');

    let form = document.querySelector('#edit-movie form');
    //give variable to eventlistener
    form.addEventListener('submit', (event) => editMovie(event, movie));
    document.querySelector('#title').value = movie.title;
    document.querySelectorAll('textarea')[1].value = movie.description;
    document.querySelector('#imageUrl').value = movie.img;
}

async function editMovie(event, movie){
    event.preventDefault();

    const form = document.querySelector('#edit-movie form');

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img')

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies/' + movie._id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({title, description, img})
    });

    form.reset();
    homePage();
}
