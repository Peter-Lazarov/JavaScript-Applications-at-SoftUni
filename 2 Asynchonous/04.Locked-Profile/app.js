function lockedProfile() {
    try{
        function profileMechanics(event){
            let lockButtonStatus = event.target.parentElement.querySelector("input[value=lock]").checked;
            if(!lockButtonStatus){
                if(event.target.parentElement.querySelector("button").textContent == "Hide it"){
                    event.target.parentElement.querySelector("div").style.display = "none";
                    event.target.parentElement.querySelector("button").textContent = "Show more";
                }else{
                    event.target.parentElement.querySelector("div").style.display = "block";
                    event.target.parentElement.querySelector("button").textContent = "Hide it";
                }
            }
        }
        let showHideButton = document.querySelector("div.profile button");
        showHideButton.addEventListener("click", profileMechanics);
        
        const mainElement = document.getElementById("main");
    
        const profileGiven = document.querySelector("div.profile");
        
        const profileGivenAsTemplate = profileGiven.cloneNode(true);
        
        const uri = `http://localhost:3030/jsonstore/advanced/profiles`;
        async function loadData(){
            const response = await fetch(uri);
            const data = await response.json();
            
            let counter = 0;
            for (const profile of Object.values(data)) {
                if(counter == 0){
                    counter++;
                    //profileGiven.children[2].checked = true;
                    //profileGiven.children[9].style.display = "none";
                    profileGiven.children[8].setAttribute("value", profile.username);
                    profileGiven.children[9].removeAttribute("class");//className = `user${counter}Username`;
                    profileGiven.children[9].setAttribute("id", `user${counter}HiddenFields`);
                    profileGiven.children[9].children[2].setAttribute("value", profile.email);
                    profileGiven.children[9].children[4].setAttribute("value", profile.age);
                    profileGiven.children[9].children[4].setAttribute("type", "email");
                    
                    //console.log(userNameElement);
                }else{
                    counter++;
                    let clone = profileGivenAsTemplate.cloneNode(true);
                    clone.children[2].setAttribute("name", `user${counter}Locked`);
                    //clone.children[2].checked = true;
                    clone.children[4].setAttribute("name", `user${counter}Locked`);
                    //clone.children[9].style.display = "none";
                    //clone.children[8].value = profile.username;
                    clone.children[8].setAttribute("name", `user${counter}Username`);
                    clone.children[8].setAttribute("value", profile.username);
                    clone.children[9].removeAttribute("class");//className = `user${counter}Username`;
                    clone.children[9].setAttribute("id", `user${counter}HiddenFields`);
                    clone.children[9].children[2].setAttribute("value", profile.email);
                    clone.children[9].children[2].setAttribute("name", `user${counter}Email`);
                    clone.children[9].children[4].setAttribute("value", profile.age);
                    clone.children[9].children[4].setAttribute("type", "email");
                    clone.children[9].children[4].setAttribute("name", `user${counter}Age`);
                    clone.children[10].addEventListener("click", profileMechanics);
                    mainElement.appendChild(clone);
                }
            }

            // let allButtons = document.querySelectorAll("input[type='radio'][value='lock']");
            // for (let button of allButtons) {
            //     button.checked = true;
            // }
        }
        loadData();

    }catch(error){

    }
}
