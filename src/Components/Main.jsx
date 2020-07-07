import React from "react";
import { HashRouter } from "react-router-dom";
import {
    fetchTotalCases,
    getCasesByCountryList,
    getDeathsByCountryList,
    getRecoveredByCountryList,
} from "../Api.js";

import Chart from "./Chart.jsx";
import Navbar from "./Navbar.jsx";
import Stats from "./Stats.jsx";

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
        const { cases, deaths, recovered } = await fetchTotalCases();
        this.setState({
            cases,
            deaths,
            recovered,
        });

        this.setState({
            casesByCountry: await getCasesByCountryList(),
            deathsByCountry: await getDeathsByCountryList(),
            recoveredByCountry: await getRecoveredByCountryList(),
        });
    }

    render() {
        return (
            <HashRouter>
                <div className="content">
                    <div className="left">
                        <Navbar />
                        <Stats
                            path={["/cases", "/"]}
                            data={this.state.casesByCountry}
                            cases={this.state.cases}
                            color={"blue"}
                        />
                        <Stats
                            path={"/deaths"}
                            data={this.state.deathsByCountry}
                            cases={this.state.deaths}
                            color={"red"}
                        />
                        <Stats
                            path={"/recovered"}
                            data={this.state.recoveredByCountry}
                            cases={this.state.recovered}
                            color={"green"}
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
