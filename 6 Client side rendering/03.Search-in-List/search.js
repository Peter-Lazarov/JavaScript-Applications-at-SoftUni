import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns as townNames} from './towns.js';

const towns = townNames.map(t => ({name: t, match: false}));
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', searchAction);

const listTemplate = (towns) => html`
<ul>
${towns.map(t => html`<li class=${t.match ? 'active' : ''} >${t.name}</li>`)}
</ul>`;

function update(){
   render(listTemplate(towns), root);
}

function searchAction(){
   const searchedString = input.value.trim();
   let matches = 0;
   for (let town of towns) {
      if(searchedString && town.name.includes(searchedString)){
         town.match = true;
         matches++;
      }else{
         town.match = false;
      }
   }

   output.textContent = `${matches} matches found`;
   update();
}

update();
