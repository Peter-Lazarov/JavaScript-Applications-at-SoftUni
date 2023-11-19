window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form#login');
    form.addEventListener('submit', onLogin);

    document.getElementById('user').style.display = "none";
});

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = '/index.html';

    }catch (error){
        alert(error.message);
    }
    
}
