window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form#register');
    form.addEventListener('submit', onRegister);

    document.getElementById('user').style.display = "none";
});

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('rePass');

    try {
        if(email && password && password === rePassword){
                const response = await fetch('http://localhost:3030/users/register', {
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

            // const data = await response.json();
            // const userData = {
            //     email: data.email,
            //     id: data._id,
            //     token: data.accessToken
            // }
            
            // sessionStorage.setItem('userData', JSON.stringify(userData));
            window.location = '/index.html';
        }else{
            document.querySelector("#register-view p.notification").textContent = "Fill properly fields.";
            throw new Error("Fill properly fields.");
        }
    }catch (error){
        alert(error.message);
    }
}
