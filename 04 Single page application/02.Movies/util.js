function hideAll(){
    document.querySelectorAll('.view-section').forEach(view => view.style.display = 'none');
}

export function showView(navigationId){
    hideAll();
    document.querySelector(navigationId).style.display = 'block';
}

export function navigationCare(){
    const user = JSON.parse(localStorage.getItem('user'));
    const msgContainer = document.getElementById("welcome-msg");
    if(user){
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        msgContainer.textContent = "Welcome, " + user.email;
    }else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
        msgContainer.textContent = "";
    }
}
