function attachEvents() {
    document.getElementById("submit").addEventListener("click", getCity);
    document.getElementById("location").value = "New York";

    async function getCity(){
        const cityName = document.getElementById("location").value; //"New York";
        const uri = `http://localhost:3030/jsonstore/forecaster/locations`;
        const response = await fetch(uri);
        const allCities = await response.json();

        let currentCity = allCities.find(city => city.name == cityName);

        const cityCode = currentCity.code;
        const uriForcast = `http://localhost:3030/jsonstore/forecaster/today/${cityCode}`;
        const uriUpcommingForcast = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`;

        const responseForcast = await fetch(uriForcast);
        const forecastForDay = await responseForcast.json();

        let divForeCast = document.getElementById("forecast");
        divForeCast.style.display = "";
        
        let divContainer = document.createElement("div");
        divContainer.classList.add("forecasts");

        let spanSymbol = document.createElement("span");
        spanSymbol.classList.add("condition");
        spanSymbol.classList.add("symbol");
        
        let condition = forecastForDay.forecast.condition;
        if(condition == "Sunny"){
            spanSymbol.innerHTML = "&#x2600;";
        }else if(condition == "Partly Sunny"){
            spanSymbol.innerHTML = "&#x26C5;";
        }else if(condition == "Overcast"){
            spanSymbol.innerHTML = "&#x2601;";
        }else if(condition == "Rain"){
            spanSymbol.innerHTML = "&#x2614;";
        }

        divContainer.appendChild(spanSymbol);

        let spanAll = document.createElement("span");
        spanAll.classList.add("condition");

        let spanElement1 = document.createElement("span");
        spanElement1.textContent = forecastForDay.name;
        spanElement1.classList.add("forecast-data");
        spanAll.appendChild(spanElement1);

        let spanElement2 = document.createElement("span");
        spanElement2.innerHTML = `${forecastForDay.forecast.low}&#176;/${forecastForDay.forecast.high}&#176;`;
        spanElement2.classList.add("forecast-data");
        spanAll.appendChild(spanElement2);

        let spanElement3 = document.createElement("span");
        spanElement3.textContent = forecastForDay.forecast.condition;
        spanElement3.classList.add("forecast-data");
        spanAll.appendChild(spanElement3);

        divContainer.appendChild(spanAll);

        let divWithCurrentForcast = document.querySelector("div#current");
        divWithCurrentForcast.appendChild(divContainer);

        // <div id="forecast" style="display:none">
        //     <div id="current">
        //         <div class="label">Current conditions</div>

        // { 
        //     name: locationName,
        //     forecast: { low: temp,
        //     high: temp,
        //     condition: condition } 
        // }
        
        const responseForcast3Days = await fetch(uriUpcommingForcast);
        const forecastFor3Days = await responseForcast3Days.json();

        let divForecastInfo = document.createElement("div");
        divForecastInfo.classList.add("forecast-info");

        for (const currnetForecast of forecastFor3Days.forecast) {
            let spanSymbol = document.createElement("span");
            spanSymbol.classList.add("symbol");
            
            let condition = currnetForecast.condition;
            if(condition == "Sunny"){
                spanSymbol.innerHTML = "&#x2600;";
            }else if(condition == "Partly sunny"){
                spanSymbol.innerHTML = "&#x26C5;";
            }else if(condition == "Overcast"){
                spanSymbol.innerHTML = "&#x2601;";
            }else if(condition == "Rain"){
                spanSymbol.innerHTML = "&#x2614;";
            }

            let spanUpcoming = document.createElement("span");
            spanUpcoming.classList.add("upcoming");
            spanUpcoming.appendChild(spanSymbol);

            let spanElement4 = document.createElement("span");
            spanElement4.innerHTML = `${currnetForecast.low}&#176;/${currnetForecast.high}&#176;`;
            spanElement4.classList.add("forecast-data");
            spanUpcoming.appendChild(spanElement4);

            let spanElement5 = document.createElement("span");
            spanElement5.textContent = condition;
            spanElement5.classList.add("forecast-data");
            spanUpcoming.appendChild(spanElement5);
            
            divForecastInfo.appendChild(spanUpcoming);
        }

        let divUpcomming = document.getElementById("upcoming");
        divUpcomming.appendChild(divForecastInfo);
        
        // let spanElement4 = document.createElement("span");
        // spanElement4.textContent = forecastFor3Days.name;
        // divWithCurrentForcast.appendChild(spanElement4);

        // { 
        //     name: locationName,
        //     forecast: [{ low: temp,
        //     high: temp,
        //     condition: condition }, … ] 
        // }
        
    }

}

attachEvents();
