//1 Create book
//2 Update book
//3 Delete book

function all(){
    const url = "http://localhost:3030/jsonstore/collections/books";
    
    async function load() {
        const response = await fetch(url);
        const data = await response.json();
        
        const booksArray = Object.entries(data);
        return booksArray;
    }

    async function deleteAction(event){
        let deleteButton = event.target;
        const idToDelete = deleteButton.id;
        
        deleteButton.parentElement.parentElement.remove();

        const options = {
            method: "delete"
        };
        const response = await fetch(url + "/" + idToDelete, options);

        //writeTable();
    }

    const formElement = document.getElementsByTagName("form")[0];
    formElement.addEventListener("submit", submit);

    let submitButton = formElement.childNodes[11];

    function submit(event) {
        event.preventDefault();
        createAction();
    }

    async function createAction(){
        const titleField = formElement.childNodes[5].value;
        const authorField = formElement.childNodes[9].value;
        
        formElement.childNodes[5].value = "";
        formElement.childNodes[9].value = "";
        
        if(titleField && authorField){
            const book = {
                author: authorField,
                title: titleField
            }

            const options = {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(book)
            }

            const response = await fetch(url, options);
        }

        writeTable();
    }

    let idToEdit = "";

    async function editAction(event){
        event.preventDefault();
        formElement.removeEventListener("submit", submit);

        formElement.childNodes[1].textContent = "Edit FORM";

        submitButton.textContent = "Save";

        let editButton = event.target;
        let trElement = editButton.parentElement.parentElement;
        idToEdit = editButton.id;

        formElement.childNodes[5].value = trElement.childNodes[0].textContent;
        formElement.childNodes[9].value = trElement.childNodes[1].textContent;

        formElement.addEventListener("submit", saveEdit);
    }

    async function saveEdit(event){
        event.preventDefault();
        const titleFieldElement = formElement.childNodes[5];
        const authorFieldElement = formElement.childNodes[9];
        
        let titleField = titleFieldElement.value;
        let authorField = authorFieldElement.value;

        titleFieldElement.value = "";
        authorFieldElement.value = "";
        
        if(titleField && authorField){
            try {
                const book = {
                    author: authorField,
                    title: titleField
                }
    
                const options = {
                    method: "put",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(book)
                }

                let urlForPut = url + "/" + idToEdit;

                const response = await fetch(urlForPut, options);
                
            } catch (error) {
                console.log("Error");
            }
        }

        idToEdit = "";
        formElement.childNodes[1].textContent = "FORM";
        submitButton.textContent = "Submit";

        formElement.removeEventListener("submit", saveEdit);
        formElement.addEventListener("submit", submit);

        writeTable();
    }

    async function writeTable(){
        let tableBody = document.querySelector("tbody");
        tableBody.replaceChildren();
        const allData = await load();
        
        for (const book of allData) {
            let trElement = document.createElement("tr");
            let titleTdElement = document.createElement("td");
            let authorNameTdElement = document.createElement("td");
            let actionTdElement = document.createElement("td");
            
            titleTdElement.textContent = book[1].title;
            authorNameTdElement.textContent = book[1].author;

            let editButton = document.createElement("button");
            editButton.id = book[0];
            editButton.textContent = "Edit";
            editButton.addEventListener("click", editAction);

            let deleteButton = document.createElement("button");
            deleteButton.id = book[0];
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", deleteAction);

            actionTdElement.appendChild(editButton);
            actionTdElement.appendChild(deleteButton);

            trElement.appendChild(titleTdElement);
            trElement.appendChild(authorNameTdElement);
            trElement.appendChild(actionTdElement);

            tableBody.appendChild(trElement);
        }
    }
    
    writeTable();
    document.getElementById("loadBooks").addEventListener("click", writeTable);
}

all();
