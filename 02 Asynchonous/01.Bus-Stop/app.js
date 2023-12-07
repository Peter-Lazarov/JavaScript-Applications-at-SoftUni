async function getInfo() {
    try {
        let inputNumber = document.getElementById("stopId").value;
        const stopNameElement = document.getElementById("stopName");
        if (!inputNumber) {
            stopNameElement.textContent = "Error";
        } else {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputNumber}`);
            const ulElement = document.getElementById("buses");
            ulElement.innerHTML = "";

            if (response.status != 200) {
                stopNameElement.textContent = "Error";
            } else {
                const data = await response.json();
                stopNameElement.textContent = data.name;

                for (let [busId, time] of Object.entries(data.buses)) {
                    let liElement = document.createElement("li");
                    liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
                    ulElement.appendChild(liElement);
                }
            }
        }
    }catch(error){
        document.getElementById("stopName").textContent = "Error";
    }
}
