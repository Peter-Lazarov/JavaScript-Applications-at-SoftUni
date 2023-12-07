import { html, render } from "../src/library.js";
import { logoutAction } from "./logout.js";

const headerElement = document.querySelector('header');
const navigationTemplate = (isUser) => {
    return html`
        <a id="logo" href="/"
            ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
            <div>
            <a href="/products">Products</a>
            </div>

            ${isUser 
                ? html`<!-- Logged-in users -->
                <div class="user">
                <a href="/products/add">Add Product</a>
                <a href="javascript:void(0)" id="logoutButton" @click = ${logoutAction}>Logout</a>
                </div>` 

                : html`<!-- Guest users -->
                <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                </div>`}
        </nav>`;
}

export function navigationUpdate(context, next){
    render(navigationTemplate(context.user()), headerElement);
    next();
}
