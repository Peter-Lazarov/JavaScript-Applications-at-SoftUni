let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = "none";
        loadAction();
        document.querySelector("#addForm .add").disabled = false;
    } else {
        document.getElementById('user').style.display = "none";
        document.getElementById('catches').replaceChildren();
    }

    document.getElementById("logout").addEventListener("click", logOutAction);
    document.querySelector("button.load").addEventListener('click', loadAction);
    document.getElementById('addForm').addEventListener('submit', createAction);
});

async function createAction(event){
    event.preventDefault();
    if(!userData){
        window.location = '/login.html';
        return;
    }

    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});
    //console.log(data);

    try {
        if(Object.values(data).some(x => x == '')){
            throw new Error('All fields are required');
        }

        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        loadAction();
        event.target.reset();
    }catch (error){
        alert(error.message);
    }
}

async function editAction(event){
    event.preventDefault();

    try {
        let divCatch = event.target.parentElement;

        let catchFromDiv = {
            angler: divCatch.children[1].value,
            weight: divCatch.children[3].value,
            species: divCatch.children[5].value,
            location: divCatch.children[7].value,
            bait: divCatch.children[9].value,
            captureTime: Number(divCatch.children[11].value),
        };

        const idEdit = event.target.getAttribute("data-id");

        const response = await fetch('http://localhost:3030/data/catches/' + idEdit, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(catchFromDiv)
        });

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        loadAction();
    }catch (error){
        alert(error.message);
    }
}

async function deleteAction(event){
    event.preventDefault();
    if(!userData){
        window.location = '/login.html';
        return;
    }

    const idDelete = event.target.getAttribute("data-id");

    const response = await fetch('http://localhost:3030/data/catches/' + idDelete, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }
    });

    event.target.parentElement.remove();

    loadAction();
}

async function loadAction() {
    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();
    
    //document.getElementById('catches').replaceChildren(...data.map(createCatch)); // advanced way
    document.getElementById('catches').replaceChildren();
    
    //document.getElementById('catches').innerHTML = "";
    if(data.length == undefined){
        const newElement = createCatch(data);
            //console.log(newElement);
        let someDiv = document.getElementById('catches');
        someDiv.appendChild(newElement);
    }else{  
        for (const currentObject of data) {
            const newElement = createCatch(currentObject);
            //console.log(newElement);
            let someDiv = document.getElementById('catches');
            someDiv.appendChild(newElement);
        }
    }

    for (let button of document.querySelectorAll("button.update")) {
        button.addEventListener("click", editAction);
    }

    for (let button of document.querySelectorAll("button.delete")) {
        button.addEventListener("click", deleteAction);
    }
}

function createCatch(item) {
    const isOwner = (userData && item._ownerId == userData.id);
    
    let element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML =`
        <label>Angler</label>
        <input type="text" class="angler" value="${item.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${item.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${item.species}">
        <label>Location</label>
        <input type="text" class="location" value="${item.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${item.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${item.captureTime}">
        <button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
        <button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return element;
}

async function logOutAction(){
    sessionStorage.removeItem('userData');

    const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            }
        });

    window.location = "/index.html";
}
