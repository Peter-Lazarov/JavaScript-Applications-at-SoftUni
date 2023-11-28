import { page, render } from './library.js';
import { catalogPage } from '../views/catalog.js';
import { detailsPage } from '../views/details.js';
import { createPage } from '../views/create.js';
import { editPage } from '../views/edit.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';

import { getMethod, getMethodWithBody } from './api/api.js';
import * as getMethods from './api/data.js';
window.api = getMethods;

const root = document.querySelector('div.container');

function insertContext(context, next){
    context.render = (content) => render(content, root);
    context.updateNavigation = updateNavigation;
    next();
}

function updateNavigation(){
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if(userData){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function logoutAction(){
    let response = await getMethodWithBody('/users/logout');
    //console.log(response);
    sessionStorage.removeItem('user');
    updateNavigation();
    page.redirect('/');
}

document.getElementById('logoutBtn').addEventListener('click', logoutAction);

page(insertContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);

updateNavigation();
page.start();
