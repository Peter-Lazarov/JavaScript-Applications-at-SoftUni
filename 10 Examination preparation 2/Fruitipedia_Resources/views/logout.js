import { page } from "../src/library.js";
import { getMethodWithBody } from '../src/api/requestMethods.js';

export async function logoutAction(){
    const response = await getMethodWithBody('/users/logout');
    localStorage.removeItem('user');
    page.redirect('/');
}
