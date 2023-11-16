function attachEvents() {
    //1 get all phone numbers
    //{<key>:{person:<person>, phone:<phone>}, <key2>:{person:<person2>, phone:<phone2>,…}
    //2 place every one of them in li element with delete button
    //3 implement delete request and bind it to button
    //4 post new person and phone to the database and reload - use load from first step
    // {
    //     "person": "<person>",
    //     "phone": "<phone>"
    // }

    const url = "http://localhost:3030/jsonstore/phonebook";

    async function load(){
        const response = await fetch(url);
        const phones = await response.json();
        
        return Object.values(phones);
    }
    
    document.getElementById("btnLoad").addEventListener("click", displayLoad);

    async function displayLoad(){
        const ulElement = document.getElementById("phonebook");
        ulElement.replaceChildren();
        const allPhones = await load();
        
        for (const phone of allPhones) {
            let liElement = document.createElement("li");
            liElement.textContent = `${phone.person}: ${phone.phone}`;
            
            let deleteButton = document.createElement("button");
            deleteButton.id = phone._id;
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", deleteAction);

            liElement.appendChild(deleteButton);
            ulElement.appendChild(liElement);
        }
    }

    async function deleteAction(event){
        let deleteButton = event.target;
        const idToDelete = deleteButton.id;

        const options = {
            method: "delete"
        };
        const response = await fetch(url + "/" + idToDelete, options);

        displayLoad();
    }

    async function postNewPerson(){
        const personName = document.getElementById("person").value;
        const personPhone = document.getElementById("phone").value;
        const postBody = {
            "person": personName,
            "phone": personPhone
        }
        document.getElementById("person").value = "";
        document.getElementById("phone").value = "";

        const options = {
            method: "post",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(postBody)
        }

        const response = await fetch(url, options);
        displayLoad();
    }

    document.getElementById("btnCreate").addEventListener("click", postNewPerson);
}

attachEvents();
