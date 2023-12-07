export const host = "http://localhost:3030";

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

export async function postMethod(url, data) {
    const options = {
        method: "Post",
    }

    if(data != undefined){
        options.headers = {'Content-Type': 'application/json'};
        options.body = JSON.stringify(data);
    }

    let user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
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
        method: "Delete",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        }
    }

    return await fetch(host + url, options);
}
