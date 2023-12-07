import { html, render, page } from "./library.js";

import { navigationUpdate } from "../views/navigation.js";
import { userMiddleware } from "./userMiddleware.js";
import { homeView } from "../views/home.js";
import { loginView } from "../views/login.js";
import { registerView } from "../views/register.js";
import { charactersView } from "../views/characters.js";
import { detailsView } from "../views/details.js";
import { addCharacterView } from "../views/add.js";
import { editCharacterView } from "../views/edit.js";

const root = document.querySelector('main');
function insertContext(context, next){
    context.render = (content) => render(content, root);
    next();
}

page(insertContext)
page(userMiddleware);
page(navigationUpdate);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/characters", charactersView)
page("/characters/:id/details", detailsView);
page("/characters/add", addCharacterView);
page("/characters/:id/edit", editCharacterView);

page.start();
