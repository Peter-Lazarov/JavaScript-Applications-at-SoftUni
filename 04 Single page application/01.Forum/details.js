import { showHome } from "./home.js";

//let container = document.querySelector('.topic-container').remove();
document.getElementById('homeLink').addEventListener('click', showHome);

let commentForm;
let postIdGlobal = "";

export function showDetails(event) {
    let target = event.target;

    if (target.tagName == 'H2') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        event.preventDefault();
        const postId = target.id;

        postIdGlobal = postId;
        showPost();
    }
}

async function showPost() {
    let themeContentDiv = document.createElement('div');
    themeContentDiv.classList = 'theme-content';
    document.querySelector('div.container').replaceChildren(themeContentDiv);
    // const [postResponse, commentsResponse] = await Promise.all(
    //     [
    //         fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postIdGlobal),
    //         fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
    //     ])

    // const [post, allComments] = await Promise.all([
    //     postResponse.json(),
    //     commentsResponse.json()
    // ])

    const postResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postIdGlobal);
    const post = await postResponse.json();

    let titleThemeDiv = document.createElement('div');
    titleThemeDiv.classList = 'theme-title';
    titleThemeDiv.innerHTML = `
        <div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${post.title}</h2>
            </div>
        </div>`;

    themeContentDiv.appendChild(titleThemeDiv);

    //<div class="comment"></div>
    let divComment = document.createElement('div');
    divComment.classList = 'comment';

    themeContentDiv.appendChild(divComment);

    let divPost = document.createElement('div');
    divPost.classList = 'header';
    divPost.innerHTML = `
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>${post.dateCreated}</time></p>

        <p class="post-content">${post.content}</p>
    `;

    divComment.appendChild(divPost);

    let divCommentForm = document.createElement('div');
    divCommentForm.classList = 'answer-comment';
    divCommentForm.innerHTML = `
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form>
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>`;

    commentForm = divCommentForm.querySelector('form')
    commentForm.addEventListener('submit', sendComment);
    
    themeContentDiv.appendChild(divCommentForm);

    const commentsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const allComments = await commentsResponse.json();

    let allCommentsValues = Object.values(allComments);

    for (const comment of allCommentsValues) {
        if (postIdGlobal == comment.postIdGlobal) {
            let divWithCurrentComment = document.createElement('div');
            divWithCurrentComment.id = 'user-comment';
            divWithCurrentComment.innerHTML = `<div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${comment.commentUser}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                        <div class="post-content">
                            <p>${comment.commentContent}</p>
                        </div>
                    </div>
                </div>`;
            divComment.appendChild(divWithCurrentComment);
        }
    }

   
}

async function sendComment(event) {
    event.preventDefault();

    const commentContent = commentForm.querySelector('textarea').value;
    const commentUser = commentForm.querySelector('#username').value;

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            commentUser,
            commentContent,
            postIdGlobal,
        })
    });

    //showPost();
}
