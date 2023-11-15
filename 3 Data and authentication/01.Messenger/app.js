function attachEvents() {
    //1 create object wiht data from fields
    //2 post request
    //3 refresh
    //  4 get all message
    //  5 display them

    // {
    //     "-LxHVtajG3N1sU714pVj": {
    //         "author": "Spami",
    //         "content": "Hello, are you there?"
    //     },
    //     "-LxIDxC-GotWtf4eHwV8": {
    //         "author": "Garry",
    //         "content": "Yep, whats up :?"
    //     },
    // }
    
    const url = "http://localhost:3030/jsonstore/messenger";

    function getDataFromFields() {
        const author = document.querySelector("input[name=author]").value;
        const content = document.querySelector("input[name=content]").value;

        let currentMessage = {
            "author": author,
            "content": content
        }

        return currentMessage;
    }

    function uploadMessage(message) {
        fetch(url, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(message),
        });
    }

    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", send);
    let refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refresh);

    async function getAllMessages(){
        const response = await fetch(url);
        let messagesAll = await response.json();

        return Object.values(messagesAll);
    }

    function send(){
        const message = getDataFromFields();
        uploadMessage(message);
    }

    async function refresh(){
        const allMessages = await getAllMessages();
        let result = "";
        for (const message of allMessages) {
            result += `\n${message.author}: ${message.content}`;
        }
        result = result.replace("\n", "");
        document.getElementById("messages").textContent = result;
    }

}

attachEvents();
