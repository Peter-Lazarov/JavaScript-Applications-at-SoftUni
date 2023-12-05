import { html } from "../src/library.js";
import { getMethod } from "../src/api/requestMethods.js";

const searchTemplate = (submitAction, resultSearch) => html`
    <!-- Search page -->
    <section id="search">
        <div class="form">
            <h2>Search</h2>
            <form @submit = ${submitAction} class="search-form">
                <input
                type="text"
                name="search"
                id="search-input"
                />
                <button class="button-list">Search</button>
            </form>
        </div>
        ${resultSearch ? html`<h4>Results:</h4>
        <div class="search-result">
            ${resultSearch}
        </div>`
        : ``}
    </section>`;

const fruitTemplate = (fruit) => html`
    <!--If there are matches display a div with information about every fruit-->
    <div class="fruit">
        <img src=${fruit.imageUrl} alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/fruit/${fruit._id}/details">More Info</a>
    </div>`;

export async function searchView(context){
    let resultFromSearchHTMLResult = [];
    
    async function submitAction(event){
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const searchField = formData.get('search').trim();
        event.target.reset();

        try {
            if(searchField){
                const fruitsAll = await getMethod(`/data/fruits?where=name%20LIKE%20%22${searchField}%22`);
                //array with object by names
                if(fruitsAll.length > 0){
                    for (const fruit of fruitsAll) {
                        resultFromSearchHTMLResult.push(fruitTemplate(fruit));
                    }
                }else{
                    resultFromSearchHTMLResult.push(html`<p class="no-result">No result.</p>`);
                }

                context.render(searchTemplate(submitAction, resultFromSearchHTMLResult));
                resultFromSearchHTMLResult = [];
            }else{
                throw new Error('Write some fruit to search it')
            }
        } catch (error) {
            window.alert(error.message);
        }
    }
    
    context.render(searchTemplate(submitAction, null));
}
