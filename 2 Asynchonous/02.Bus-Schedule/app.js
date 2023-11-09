function solve() {
    const uri = "http://localhost:3030/jsonstore/bus/schedule/";
    let statusElement = document.querySelector("div#info span.info");
    const arriveButton = document.getElementById("arrive");
    const departButton = document.getElementById("depart");
    let nextStop = "depot";

    async function depart() {
        try {
            const response = await fetch(uri + nextStop);
            const data = await response.json();

            currentStop = data.name;
            statusElement.textContent = `Next stop ${currentStop}`;
            nextStop = data.next;

            arriveButton.disabled = false;
            departButton.disabled = true;
        }catch(error){
            statusElement.textContent = "Error";
        }
    }

    async function arrive() {
        statusElement.textContent = `Arriving at ${currentStop}`;
        arriveButton.disabled = true;
        departButton.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
