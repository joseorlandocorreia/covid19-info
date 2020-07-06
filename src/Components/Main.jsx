import React from "react";
import { HashRouter } from "react-router-dom";
import Country from "./Country.jsx";
import { fetchTotalCases } from "../Api.js";
import Chart from "./Chart.jsx";
import Navbar from "./Navbar.jsx";
import RouteComponent from "./RouteComponent.jsx";


const casesStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=cases&allowNull=false";
const deathsStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=deaths&allowNull=false";
const recoveredStatsUrl =
    "https://disease.sh/v2/countries?yesterday=true&sort=recovered&allowNull=false";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: "Loading ...",
            deaths: "Loading ...",
            recovered: "Loading ...",
            casesByCountry: [],
            deathsByCountry: [],
            recoveredByCountry: [],
            countries: [
                {
                    country: "Loading ...",
                    cases: "Loading ...",
                    deaths: "Loading ...",
                    recovered: "Loading ...",
                },
            ],
        };
    }

    async componentDidMount() {
        const { cases, deaths, recovered } = await fetchTotalCases();
        this.setState({
            cases,
            deaths,
            recovered,
        });

        const countriesCasesData = await (await fetch(casesStatsUrl)).json();
        const countriesDeathsData = await (await fetch(deathsStatsUrl)).json();
        const countriesRecoveredData = await (
            await fetch(recoveredStatsUrl)
        ).json();

        this.setState({
            casesByCountry: countriesCasesData.map((element) => (
                <Country
                    flag={element.countryInfo.flag}
                    name={element.country}
                    value={element.cases}
                />
            )),
            deathsByCountry: countriesDeathsData.map((element) => (
                <Country
                    flag={element.countryInfo.flag}
                    name={element.country}
                    value={element.deaths}
                />
            )),
            recoveredByCountry: countriesRecoveredData.map((element) => (
                <Country
                    flag={element.countryInfo.flag}
                    name={element.country}
                    value={element.recovered}
                />
            )),
        });
    }

    render() {
        return (
            <HashRouter>
                <div className="content">
                    <div className="left">
                        <Navbar />
                        <RouteComponent
                            path={["/cases", "/"]}
                            data={this.state.casesByCountry}
                            cases={this.state.cases}
                        />
                        <RouteComponent
                            path={"/deaths"}
                            data={this.state.deathsByCountry}
                            cases={this.state.deaths}
                        />
                        <RouteComponent
                            path={"/recovered"}
                            data={this.state.recoveredByCountry}
                            cases={this.state.recovered}
                        />
                    </div>
                    <div className="right">
                        <div id="mapid"></div>
                        <Chart />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
