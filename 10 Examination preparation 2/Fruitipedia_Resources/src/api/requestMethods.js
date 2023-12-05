export const host = "http://localhost:3030";

const endPoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myItems: (currentUserId) => `/data/catalog?where=_ownerId%3D%22${currentUserId}%22`,
    create: '/data/fruits',
    edit: '/data/fruits/',
    delete: '/data/fruits/'
}

export async function getMethod(url) {
    try {
        const response = await fetch(host + url);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getMethodWithBody(url, data) {
    const options = {
        method: "GET",
        headers: {}
    }

    // if (data != undefined) {
    //     options.headers = { 'content-type': 'application/json' };
    //     options.body = JSON.stringify(data);
    // }

    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        const token = user.accessToken;
        options.headers['x-authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                localStorage.removeItem('user');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        throw error;
    }
}

export async function postMethod(url, data) {
    const options = {
        method: "POST",
    }

    if (data != undefined) {
        options.headers = { 'content-type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        const token = user.accessToken;
        options.headers['x-authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                localStorage.removeItem('user');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        throw error;
    }
}

export async function putMethod(url, data) {
    const options = {
        method: "PUT",
    }

    if (data != undefined) {
        options.headers = { 'content-type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        const token = user.accessToken;
        options.headers['x-authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                localStorage.removeItem('user');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteMethod(url) {
    const user = JSON.parse(localStorage.getItem('user'));

    let a = user.accessToken;

    const options = {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'x-authorization': user.accessToken
        }
    }

    return await fetch(host + url, options);
}

export async function loginRequest(email, password) {
    if (email && password) {
        const loginData = {
            email: email,
            password: password
        }
        const url = '/users/login';
        const user = await postMethod(url, loginData);
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export async function registerRequest(email, password) {
    const loginData = {
        email: email,
        password: password
    }

    const url = '/users/register';
    const user = await postMethod(url, loginData);
    localStorage.setItem('user', JSON.stringify(user));
}

export function createItem(itemData) {
    return postMethod(endPoints.create, itemData);
}

export function editItem(itemId, itemData) {
    return putMethod(endPoints.edit + itemId, itemData);
}

export function deleteItem(itemId) {
    return deleteMethod(endPoints.delete + itemId);
}
