import { showView } from './util.js'
import { detailsPage } from './details.js'

const catalog = document.querySelector('#movie .card-deck.d-flex.justify-content-center');
catalog.addEventListener('click', (event) => {
    if(event.target.tagName == 'BUTTON'){
        event.preventDefault();
        const id = event.target.dataset.id;
        //console.log(id);
        detailsPage(id);
    }
})

export function homePage(){
    showView('#home-page');
    displayMovies();
}

async function getMovies(){
    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();

    return data;
}

async function displayMovies(){
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie){
    const element = document.createElement('li');
    element.className = 'card mb-4';
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href"/details/${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    `;

    return element;
}

window.getMovies = getMovies;
