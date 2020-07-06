import L from "leaflet";

const totalCasesURL = "https://disease.sh/v2/all?yesterday=true&allowNull=true";

function generateMap() {
    const mymap = L.map("mapid").setView([38.736946, -9.142685], 3);
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
            attribution:
                'Map data &copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a target="_blank" rel="noopener noreferrer" href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                "pk.eyJ1Ijoib3JsYW5kb2NvcnJlaWEiLCJhIjoiY2tiYzgwYzB5MDhxMzJ6bXAxY2c4dXRyaSJ9.o4D9aIQw7DkYW8BSMbfKqQ",
        }
    ).addTo(mymap);
    //TODO: generate proportional circles and apply them to the map
    
}

async function fetchTotalCases() {
    const results = {};
    await fetch(totalCasesURL)
        .then((response) => response.json())
        .then((data) => {
            results.cases = data.cases;
            results.deaths = data.deaths;
            results.recovered = data.recovered;
        })
        .catch((err) => console.log(err));
    return results;
}

export { generateMap, fetchTotalCases };
