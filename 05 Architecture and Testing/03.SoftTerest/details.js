import { getMethod, deleteMethod } from "./application.js";
import { goTo } from "./navigation.js";

const url = '/data/ideas/'

const detailsPageDiv = document.getElementById("detailsPage");

export async function showDetails(replaceFunction, ideaId) {
    const idea = await getMethod(url + ideaId);

    const user = JSON.parse(localStorage.getItem('user'));

    const isOwner = user && user._id == idea._ownerId;
    detailsPageDiv.innerHTML = createIdeaContent(idea, isOwner);

    if (isOwner) {
        detailsPageDiv.querySelector('#deleteBtn').addEventListener('click', async (event) => {
            event.preventDefault();
            const choice = confirm('Are you sure you want to delete this idea?');
            if (choice) {
                await deleteMethod(url + ideaId);
                goTo('/catalog');
            }
        });
    }

    replaceFunction(detailsPageDiv);
}

function createIdeaContent(idea, isOwner) {
    let ideaContent = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    `

    if (isOwner) {
        ideaContent += `
        <div class="text-center">
            <a id="deleteBtn" class="btn detb" href="">Delete</a>
        </div>
        `;
    }

    return ideaContent;
}

{/* 
<img class="det-img" src="./images/dinner.jpg" />
<div class="desc">
    <h2 class="display-5">Dinner Recipe</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a
        long
        day. With so many easy pasta recipes out there, there's something for every palate to love. That's
        why
        pasta
        makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to
        its
        versatility.</p>
</div>
<div class="text-center">
    <a class="btn detb" href="">Delete</a>
</div> 
*/}
