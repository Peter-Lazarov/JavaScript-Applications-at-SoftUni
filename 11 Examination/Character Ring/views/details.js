import { getMethod, postMethod, deleteItem } from "../src/api/requestMethods.js";
import { html } from "../src/library.js";

const detailsTemplate = (character, buttonsHTMLResult, likeCount) => html`
<!-- Details page -->
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${character.imageUrl} alt="example1" />
    <div>
      <p id="details-category">${character.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${character.description}</p>
          <p id="more-info">${character.moreInfo}</p>
        </div>
      </div>
      <h3>Is This Useful:<span id="likes">${likeCount}</span></h3>
      ${buttonsHTMLResult}
    </div>
  </div>
</section>`;

export async function detailsView(context){
    const characterId = context.params.id;
    const character = await getMethod(`/data/characters/${characterId}`);

    const userData = context.user(); //localStorage.getItem('user'));
    let isUser = userData != null;
    let isOwner = false;
    let buttonsHTMLResult = html``;
    
    let currentUserLikesOfcharacter = 0;
    
    const characterWithId = {
        characterId: characterId
    }
    
    if(isUser){
        isOwner = userData._id == character._ownerId;

        currentUserLikesOfcharacter = await getMethod(`/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userData._id}%22&count`);

        if(isOwner){
            buttonsHTMLResult = html`           
                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href=${`/characters/${character._id}/edit`} id="edit-btn">Edit</a>
                    <a @click = ${deleteAction} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>`;
        }else if(isUser && currentUserLikesOfcharacter == 0){
            buttonsHTMLResult = html`
                <div id="action-buttons">
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="javascript:void(0)" id="like-btn" @click = ${likeButtonMechanics}>Like</a>
                </div>`
        }
    }

    let characterLikesCount = await getMethod(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);

    async function likeButtonMechanics(event){
        event.preventDefault();
        const postResponse = await postMethod('/data/useful', characterWithId);
        //document.querySelector('a#buy-btn').style.display = 'none';
        characterLikesCount = await getMethod(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);
        context.render(detailsTemplate(character, '', characterLikesCount));
    }

    async function deleteAction(event){
        event.preventDefault();
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteItem(context.params.id);
            context.page.redirect('/characters');
        }
    }
    
    context.render(detailsTemplate(character, buttonsHTMLResult, characterLikesCount));
}
