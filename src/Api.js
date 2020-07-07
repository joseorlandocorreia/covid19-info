import React from "react";
import L from "leaflet";
import Country from "./Components/Country.jsx";

const totalCasesURL = "https://disease.sh/v2/all?yesterday=true&allowNull=true";

const casesStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=cases&allowNull=false";

const deathsStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=deaths&allowNull=false";

const recoveredStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=recovered&allowNull=false";

function generateMap(color) {
    try {
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
    var circle = L.circle([51.508, -0.11], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 50000,
    }).addTo(mymap);
    } catch (error) {
        console.log(error.message)
    }
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

async function getCasesByCountryList() {
    let componentList = [];
    const data = await (await fetch(casesStatsUrl)).json();
    data.map((element) => {
        componentList.push([
            <Country
                flag={element.countryInfo.flag}
                name={element.country}
                value={element.cases}
            />,
            "country/" + element.country,
        ]);
    });
    return componentList;
}

async function getDeathsByCountryList() {
    let componentList = [];
    const data = await (await fetch(deathsStatsUrl)).json();
    data.map((element) => {
        componentList.push([
            <Country
                flag={element.countryInfo.flag}
                name={element.country}
                value={element.deaths}
            />,
            "country/" + element.country,
        ]);
    });
    return componentList;
}

async function getRecoveredByCountryList() {
    let componentList = [];
    const data = await (await fetch(recoveredStatsUrl)).json();
    data.map((element) => {
        componentList.push([
            <Country
                flag={element.countryInfo.flag}
                name={element.country}
                value={element.recovered}
            />,
            "country/" + element.country,
        ]);
    });
    return componentList;
}

export {
    generateMap,
    fetchTotalCases,
    getCasesByCountryList,
    getDeathsByCountryList,
    getRecoveredByCountryList,
};
