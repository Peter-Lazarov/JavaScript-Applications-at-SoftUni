import { html, render } from "../src/library.js";
import { logoutAction } from "./logout.js";

const headerElement = document.querySelector('header');
const navigationTemplate = (isUser) => html`
    <!-- Navigation -->
    <a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.png" alt=""
    /></a>

    <nav>
        <div>
        <a href="/fruit/all">Fruits</a>
        <a href="/search">Search</a>
        </div>

        ${isUser ? html`
        <!-- Logged-in users -->
        <div class="user">
            <a href="/fruit/add">Add Fruit</a>
            <a href="javascript:void(0)" @click = ${logoutAction}>Logout</a>
        </div>` 
        : html`
        <!-- Guest users -->
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}
    </nav>`;

export function navigationUpdate(context, next) {
    render(navigationTemplate(context.user()), headerElement);
    next();
}
