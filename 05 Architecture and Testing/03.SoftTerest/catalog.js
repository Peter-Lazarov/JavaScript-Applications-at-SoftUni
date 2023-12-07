import { getMethod,  } from "./application.js";
import { replaceView } from "./navigation.js";
import { showDetails } from "./details.js";

const catalogPageDiv = document.getElementById("dashboard-holder");
catalogPageDiv.addEventListener('click', onDetailsSelect);

export async function showCatalog(replaceFunction){
    replaceFunction(catalogPageDiv);
    const ideas = await getAllIdeas();
    if(ideas.length == 0){
        catalogPageDiv.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }else{
        catalogPageDiv.replaceChildren(...ideas.map(createIdeaPreview));
    }
}
const url = '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc';

export async function getAllIdeas(){
    return getMethod(url);
}

function createIdeaPreview(idea){
    const dashboardDiv = document.createElement('div');
    dashboardDiv.className = 'card overflow-hidden current-card details';
    dashboardDiv.style.width = '20rem';
    dashboardDiv.style.height = '18rem';
    dashboardDiv.innerHTML = `
        <div class="card-body">
            <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a class="btn" href="/details" data-id="${idea._id}" >Details</a>
    `;

    return dashboardDiv;
}

function onDetailsSelect(event){
    let target = event.target;
    if(target.tagName == 'A'){
        event.preventDefault();
        const id = target.dataset.id;
        if(id){
            showDetails(replaceView, id);
        }
    }
}
