import { showView } from "./util.js";
import { deleteMovie } from "./delete.js";
import { editPage } from "./edit.js";

export function detailsPage(id) {
    showView('#movie-example');
    displayMovie(id);
}

async function getMovie(id) {
    const response = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await response.json();

    return movie;
}

async function displayMovie(id) {
    const user = JSON.parse(localStorage.getItem('user'));

    let movieCatalog = document.querySelector('#movie-example');
    
    //Multiple queries at once
    let [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    movieCatalog.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {
    const isOwner = user && user._id == movie._ownerId;

    let buttons = "";
    if(user){
        if (isOwner) {
            buttons = `
            <a class="btn btn-danger" href="#" data-id="${movie._id}">Delete</a>
            <a class="btn btn-warning" href="#" data-id="${movie._id}">Edit</a>`
        } else if(!ownLike){
           buttons = `<a class="btn btn-primary" href="#">Like</a>`
        }
    }

    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `<div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}" alt="Movie" />
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3">Movie Description</h3>
                <p>${movie.description}</p>
                ${buttons}
                <span class="enrolled-span">Liked ${likes}</span>
            </div>
        </div>
    </div>`;
    
    const editButton = element.querySelector(".btn-warning");
    if(editButton){
        editButton.addEventListener('click', (event) => editPage(movie));
    }

    const likeButton = element.querySelector(".btn-primary");
    if (likeButton) {
        likeButton.addEventListener('click', (event) => likeMovie(event, movie._id, user));
    }
    const deleteButton = element.querySelector(".btn-danger");
    if(deleteButton){
        deleteButton.addEventListener('click', (event) => deleteMovie(event, movie._id, user));
    }

    return element;
}

async function getLikes(id) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await response.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const likes = await response.json();

        return likes.length > 0;
    }
}

async function likeMovie(event, movieId, user) {
    event.preventDefault();

    await fetch('http://localhost:3030/data/likes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ movieId })
    });

    detailsPage(movieId);
}
