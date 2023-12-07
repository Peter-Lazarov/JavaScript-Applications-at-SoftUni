async function solution() {
    try{
        const url = "http://localhost:3030/jsonstore/advanced/articles/list";
        const response = await fetch(url);

        if(response.status != 200){
            throw new Error();
        }

        let data = await response.json();

        data.forEach(element => {
            let articleElement = document.createElement('div');
            articleElement.classList.add('accordion');
            articleElement.innerHTML = `
                <div class="head">
                    <span>${element.title}</span>
                    <button class="button" id="${element._id}" onclick="moreOnclick(event)">More</button>
                </div>
                <div class="extra"></div>
            `
            let main = document.getElementById("main");
            main.appendChild(articleElement);
        });

    }catch(error){

    }
}

async function moreOnclick(event){
    try {
        let currentTarget = event.currentTarget;
        const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + currentTarget.id;
        let parent = currentTarget.parentNode.parentNode;
        let additionalDiv = parent.querySelector("div.extra");

        let response = await fetch(url);
        if(!response.ok){
            throw new Error("Error obtaining article details");
        }

        let data = await response.json();
        additionalDiv.innerHTML = `<p>${data.content}</p>`;

        if(currentTarget.textContent == 'More'){
            currentTarget.textContent = 'Less';
            additionalDiv.style.display = 'block';
        }else{
            currentTarget.textContent = 'More';
            additionalDiv.style.display = 'none';
        }

    } catch (error) {
        
    }
}

solution()
