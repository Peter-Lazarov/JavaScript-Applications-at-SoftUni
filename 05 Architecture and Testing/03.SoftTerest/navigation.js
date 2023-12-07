import { showHome } from "./home.js";
import { showRegister } from "./register.js";
import { showLogin } from "./login.js";
import { showCatalog } from "./catalog.js";
import { showDetails } from "./details.js";
import { showCreate } from "./create.js";

const homePageContent = document.getElementById("homePage");
const registerPageContent = document.getElementById("registerPage");
const loginPageContent = document.getElementById("loginPage");
const catalogPageContent = document.getElementById("dashboard-holder");
const detailsPageContent = document.getElementById("detailsPage");
const createPageContent = document.getElementById("createPage");

const viewsAll = document.getElementById('views');

const routes = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': logoutAction,
}

document.querySelector('nav').addEventListener('click', onNavigate);
//document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);

export function replaceView(givenDiv) {
    viewsAll.replaceChildren(givenDiv);
}

function onNavigate(event) {
    let target = event.target;

    if (target.tagName == 'IMG') {
        target = target.parentElement;
    }

    if (target.tagName == 'A' && target.href) {
        event.preventDefault();
        const url = new URL(target.href);
        goTo(url.pathname);

        //console.log(url.pathname);
    }
}

export function goTo(path) {
    const viewFunction = routes[path];
    if (typeof viewFunction == 'function') {
        viewFunction(replaceView);
    }
}

export function updateNavigation(){
    const user = localStorage.getItem("user");
    const navigation = document.querySelector('nav');
    if(user){
        navigation.querySelectorAll('.user').forEach(e => e.style.display = "block");
        navigation.querySelectorAll('.guest').forEach(e => e.style.display = "none");
    }else{
        navigation.querySelectorAll('.user').forEach(e => e.style.display = "none");
        navigation.querySelectorAll('.guest').forEach(e => e.style.display = "block");
    }
}

function logoutAction(){
    localStorage.removeItem('user');
    updateNavigation();
    showHome(replaceView);
}

updateNavigation();
showHome(replaceView);
