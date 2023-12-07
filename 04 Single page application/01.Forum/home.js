import { showDetails } from "./details.js";

//const main = document.querySelector('main');


const form = document.querySelector('.new-topic-border form');
form.addEventListener('submit', submitAction);
document.querySelector('[name="cancel"]').addEventListener('click', clearForm);

export async function showHome(event) {
    if(event){
        event.preventDefault();
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const posts = await response.json();

    let allThemes = document.querySelector('.topic-title');
    let postsAsArray = Object.values(posts);
    for (const currentPost of postsAsArray) {
        allThemes.appendChild(createPostPreview(currentPost));
    }
    
    document.querySelector('.topic-name a h2').addEventListener('click', showDetails);
}

function createPostPreview(post){
    const element = document.createElement('div');
    element.className = 'topic-container';
    element.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal" id="${post._id}">
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.dateCreated}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    return element;
}

async function submitAction(event) {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(...formData.entries());

    const title = formData.get('topicName');
    const username = formData.get('username');
    const content = formData.get('postText');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                username,
                content,
                dateCreated: new Date()
            })
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error);
        }

        form.reset();
        showHome();
    } catch (error) {
        throw new Error(error);
    }
}

function clearForm() {
    form.reset();
}
