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
import { searchView } from "../views/search.js";

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
page("/fruit/all", productsView)
page("/fruit/:id/details", detailsView);
page("/fruit/add", addProductView);
page("/fruit/:id/details/edit", editProductView);
page("/search", searchView);

page.start();
