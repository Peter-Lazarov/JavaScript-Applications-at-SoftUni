import { editItem, getMethod } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";
//import { createItem } from "../src/api/requestMethods.js";

const editProductTemplate = (submitAction, character) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form @submit = ${submitAction} class="edit-form">
                <input type="text" name="category" id="category" placeholder="Character Type" .value=${character.category} />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${character.imageUrl} />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10" .value=${character.description}></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10" .value=${character.moreInfo}></textarea>
                <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>`;

export async function editCharacterView(context){
    const characterId = context.params.id;
    const character = await getMethod(`/data/characters/${characterId}`);

    context.render(editProductTemplate(submitAction, character));

    async function submitAction(event) {
        event.preventDefault();

        const formDataAsObject = new FormData(event.target);

        const category = formDataAsObject.get('category');
        const imageUrl = formDataAsObject.get('image-url');
        const description = formDataAsObject.get('description');
        const moreInfo = formDataAsObject.get('additional-info');

        try {
            if(!category || !imageUrl || !description || !moreInfo){
                throw new Error('Please fill all mandatory fields!');
            }
  
            const data = {
                category,
                imageUrl,
                description,
                moreInfo
            }

            await editItem(characterId, data);
            event.target.reset();
            context.page.redirect(`/characters/${characterId}/details`);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
