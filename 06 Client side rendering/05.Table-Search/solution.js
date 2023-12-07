import {html, render} from './node_modules/lit-html/lit-html.js';

const studentRow = (student) => html`
<tr class=${student.match ? 'select' : ''}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`;

let students;
const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', search);

async function start(){
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const result = await response.json();

   students = Object.values(result);
   students.forEach(s => s.match = false);

   update();
}

function update(){
   render(students.map(studentRow), document.querySelector('tbody'));
}

function search(){
   students.forEach(s => s.match = false);
   const inputValue = input.value.trim().toLowerCase();
   if(inputValue.length > 0){
      for (let student of students) {
         let studentParameters = Object.values(student);
         studentParameters.splice(5, 1);
         for (const parameter  of studentParameters) {
            if(parameter.toLowerCase().includes(inputValue)){
               student.match = true;
               break;
            }
         }
      }
   }

   update();
}

start();
