function attachEvents() {
    document.getElementById(`btnLoadPosts`).addEventListener('click',getAllPosts);
    document.getElementById(`btnViewPost`).addEventListener('click',displayPost);
}

attachEvents();

async function displayPost(){
    try {
        const selectedId = document.getElementById('posts').value;
        const post = await getPostById(selectedId);
        const comments = await getCommentsByPostId(selectedId);

        document.getElementById("post-title").textContent = post[0].title;
        document.getElementById("post-body").textContent = post[0].body;

        const ulElement = document.getElementById("post-comments");
        ulElement.replaceChildren();

        comments.forEach(c => {
            const liElement = document.createElement("li");
            liElement.textContent = c.text;
            liElement.id = c.id;
            ulElement.appendChild(liElement);
        });
    } catch (error) {
        
    }

}

async function getAllPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    const selectElement = document.getElementById('posts');
    selectElement.replaceChildren();
    Object.values(data).forEach(p => {
        const optionElement = document.createElement("option");
        optionElement.textContent = p.title;
        optionElement.value = p.id;

        selectElement.appendChild(optionElement);
    })

    //document.getElementById(`btnLoadPosts`).disabled = true;
}

async function getPostById(postId){
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

// async function getPostById(postId){
//     const url = 'http://localhost:3030/jsonstore/blog/posts';

//     const response = await fetch(url);
//     const data = await response.json();
//     let dataArray = Object.values(data);
//     const currentPost = dataArray.find(p => p.id == postId);

//     return currentPost;
// }

async function getCommentsByPostId(postIdSearched){
    const url = `http://localhost:3030/jsonstore/blog/comments`;
    const response = await fetch(url);
    const data = await response.json();

    const comments = Object.values(data).filter(c => c.postId == postIdSearched);

    return comments;
}
