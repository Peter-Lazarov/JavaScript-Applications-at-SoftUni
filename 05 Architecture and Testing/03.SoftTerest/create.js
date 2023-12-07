import { postMethod } from "./application.js";
import { goTo } from "./navigation.js";

const createPageDiv = document.getElementById("createPage");
const form = createPageDiv.querySelector('form');
form.addEventListener('submit', submitAction);
const url = '/data/ideas';

export function showCreate(replaceFunction){
    replaceFunction(createPageDiv);
}

async function createIdea(ideaData){
    return await postMethod(url, ideaData);
}

async function submitAction(event){
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    await createIdea({
        title,
        description,
        img
    });
    
    form.reset();
    goTo('/catalog');
}
