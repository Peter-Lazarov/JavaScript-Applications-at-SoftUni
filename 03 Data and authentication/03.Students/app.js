function all(){
    // 1 load students from database
    // 2 take student information from fields
    // 3 upload data to the database with post request
    // 4 reload the table

    const url = "http://localhost:3030/jsonstore/collections/students";
    async function load() {
        const response = await fetch(url);
        const data = await response.json();
    
        return Object.values(data);
    }

    async function writeTable(){
        let tableBody = document.querySelector("table#results tbody");
        const allData = await load();
        tableBody.replaceChildren();
        for (const student of allData) {
            let trElement = document.createElement("tr");
            let firstNameTdElement = document.createElement("td");
            let lastNameTdElement = document.createElement("td");
            let facultyNumberTdElement = document.createElement("td");
            let gradeTdElement = document.createElement("td");
            
            firstNameTdElement.textContent = student.firstName;
            lastNameTdElement.textContent = student.lastName;
            facultyNumberTdElement.textContent = student.facultyNumber;
            gradeTdElement.textContent = student.grade;

            trElement.appendChild(firstNameTdElement);
            trElement.appendChild(lastNameTdElement);
            trElement.appendChild(facultyNumberTdElement);
            trElement.appendChild(gradeTdElement);

            tableBody.appendChild(trElement);
        }
    }

    async function postNewStudent(){
        const divInputsElements = document.querySelector("div.inputs");
        const firstNameField = divInputsElements.childNodes[1].value;
        const lastNameField = divInputsElements.childNodes[3].value;
        const facultyNumberField = divInputsElements.childNodes[5].value;
        const gradeField = divInputsElements.childNodes[7].value;

        if(firstNameField && lastNameField && facultyNumberField && gradeField){
            const student = {
                firstName: firstNameField,
                lastName: lastNameField,
                facultyNumber: facultyNumberField,
                grade: gradeField
            }

            const options = {
                method: "post",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(student)
            }

            const response = await fetch(url, options);
        }

        writeTable();
    }

    // <div class="inputs">
    //     <input type="text" name="firstName" placeholder="First Name...">
    //     <input type="text" name="lastName" placeholder="Last Name...">
    //     <input type="text" name="facultyNumber" placeholder="Faculty Number...">
    //     <input type="text" name="grade" placeholder="Grade...">
    // </div>

    function submit(event) {
        event.preventDefault();
        postNewStudent();
    }
    
    writeTable();
    const formElement = document.getElementById("form");
    formElement.addEventListener("submit", submit);
}

all();
