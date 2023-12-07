import { html } from "../src/library.js";
import { getMethod } from "../src/api/requestMethods.js";

const characterTemplate = (character) => html`   
    <!-- Display a div with information about every post (if any)-->
    <div class="character">
        <img src=${character.imageUrl} alt="example1" />
        <div class="hero-info">
        <h3 class="category">${character.category}</h3>
        <p class="description">${character.description}</p>
        <a class="details-btn" href="/characters/${character._id}/details">More Info</a>
        </div>
    </div>`;

const catalogTemplate = (charactersAll) => html`
    ${charactersAll.length > 0 ? html`
        <!-- Dashboard page -->
        <h2>Characters</h2>
        <section id="characters">
            ${charactersAll}
        </section>`
        : html`
        <!-- Display an h2 if there are no posts -->
        <h2>No added Heroes yet.</h2>`
    }`;

export async function charactersView(context) {
    const characters = await getMethod('/data/characters?sortBy=_createdOn%20desc');
    let charactersAll = [];
    if(characters.length > 0){
        for (const character of characters) {
            charactersAll.push(characterTemplate(character));
        }
    }

    context.render(catalogTemplate(charactersAll));
}
