import { html } from "../src/library.js";
import { createItem } from "../src/api/requestMethods.js";

const addCharacterTemplate = (submitAction) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
      <div class="form">
        <img class="border" src="./images/border.png" alt="">
        <h2>Add Character</h2>
        <form @submit = ${submitAction} class="create-form">
          <input type="text" name="category" id="category" placeholder="Character Type" />
          <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
          <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
          <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10"></textarea>
          <button type="submit">Add Character</button>
        </form>
        <img class="border" src="./images/border.png" alt="">
      </div>
    </section>`;

export function addCharacterView(context){
    context.render(addCharacterTemplate(submitAction));

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

            await createItem(data);
            event.target.reset();
            context.page.redirect('/characters');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
