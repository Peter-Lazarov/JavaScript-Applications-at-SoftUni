import { html } from '../src/library.js';
import { getMethod } from "../src/api/requestMethods.js";

const browseTemplate = (isUser, teamsLayout) => html`
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${isUser ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
    </article>` : ''}

    ${teamsLayout}
</section>`;

const teamTemplate = (item, membersCount) => html`
<article class="layout">
    <img src="${item.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <span class="details">${membersCount} Members</span>
        <div><a href="/details/${item._id}" class="action">See details</a></div>
    </div>
</article>`;

export async function teamsPage(context){
    const userObject = sessionStorage.getItem('user');
    const haveUser = userObject != null;
    let items = [];

    let teamsLayoutTemplateResult = [];

    if(haveUser){
        const isMyTemsPath = context.pathname == '/myTeams';
        if(isMyTemsPath){
            items = await getMethod(`/data/teams?where=_ownerId%3D%22${userObject._id}%22`);
        }else{
            items = await getMethod('/data/teams');
        }
    }else{
        items = await getMethod('/data/teams');
    }

    for (const item of items) {
        const teamId = item._id;
        const members = await getMethod(`/data/members?where=teamId%3D%22${teamId}%22&status%3D%22member%22`);
        const membersCount = members.length;
        teamsLayoutTemplateResult.push(teamTemplate(item, membersCount));
    }

    //const teamsLayoutTemplateResult = items.map(teamTemplate);
    const browsePageTemplateResult = browseTemplate(haveUser, teamsLayoutTemplateResult)
    context.render(browsePageTemplateResult);
}
