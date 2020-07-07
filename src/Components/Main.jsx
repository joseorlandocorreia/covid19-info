import React from "react";
import { HashRouter } from "react-router-dom";
import {
    generateMap,
    fetchTotalCases,
    getCasesByCountryList,
    getDeathsByCountryList,
    getRecoveredByCountryList,
} from "../Api.js";
import Chart from "./Chart.jsx";
import Navbar from "./Navbar.jsx";
import RouteComponent from "./RouteComponent.jsx";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: "Loading ...",
            deaths: "Loading ...",
            recovered: "Loading ...",
            casesByCountry: ["Loading ..."],
            deathsByCountry: ["Loading ..."],
            recoveredByCountry: ["Loading ..."],
            /* Not used ... yet */
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
        generateMap();
        const { cases, deaths, recovered } = await fetchTotalCases();
        this.setState({
            cases,
            deaths,
            recovered,
        });

/*         const countriesCasesList = await getCasesByCountryList();
        const countriesDeathsList = await getDeathsByCountryList();
        const countriesRecoveredList = await getRecoveredByCountryList();
 */
        this.setState({
            casesByCountry: await getCasesByCountryList(),
            deathsByCountry: await getDeathsByCountryList(),
            recoveredByCountry: await getRecoveredByCountryList(),
        });
/*         console.log("this.state.casesByCountry")
        console.log(this.state.casesByCountry) */
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
