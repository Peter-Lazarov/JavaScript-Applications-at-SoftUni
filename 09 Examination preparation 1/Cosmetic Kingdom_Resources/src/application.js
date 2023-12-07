import { html, render, page } from "./library.js";

import { navigationUpdate } from "../views/navigation.js";
import { userMiddleware } from "./userMiddleware.js";
import { homeView } from "../views/home.js";
import { loginView } from "../views/login.js";
import { registerView } from "../views/register.js";
import { productsView } from "../views/products.js";
import { detailsView } from "../views/details.js";
import { addProductView } from "../views/add.js";
import { editProductView } from "../views/edit.js";

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
page("/products", productsView)
page("/products/:id/details", detailsView);
page("/products/add", addProductView);
page("/products/:id/edit", editProductView);

page.start();
