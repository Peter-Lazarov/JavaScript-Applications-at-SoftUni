import { html, render, page } from "./library.js";
import { getMethodWithBody } from "./api/requestMethods.js";

import { homePage } from "../views/home.js";
import { loginPage } from "../views/login.js";
import { registerPage } from "../views/register.js";
import { teamsPage } from "../views/teams.js";
import { detailsPage } from "../views/details.js";

const root = document.querySelector('main');
function insertContext(context, next){
    context.render = (content) => render(content, root);
    context.updateNavigation = updateNavigation;
    next();
}

function updateNavigation(){
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const navigation = document.querySelector('nav');
    if(userData){
        navigation.querySelectorAll('a.user').forEach(e => e.style.display = "inline-block");
        navigation.querySelectorAll('a.guest').forEach(e => e.style.display = "none");
    }else{
        navigation.querySelectorAll('a.user').forEach(e => e.style.display = "none");
        navigation.querySelectorAll('a.guest').forEach(e => e.style.display = "inline-block");
    }
}

async function logoutAction(){
    const response = await getMethodWithBody('/users/logout');
    sessionStorage.removeItem('user');
    updateNavigation();
    page.redirect('/');
}
document.getElementById('logoutButton').addEventListener('click', logoutAction);

page(insertContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/teams', teamsPage);
page('/details/:id', detailsPage);

updateNavigation()
page.start();
