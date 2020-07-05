import React from "react";
import { Route, HashRouter, NavLink } from "react-router-dom";
import Country from "./Country.jsx";
import { generateMap, fetchTotalCases } from "../Api.js";
import Chart from "./Chart.jsx";

const casesStatsURL =
    "https://disease.sh/v2/countries?yesterday=true&sort=cases&allowNull=false";
const deathStats =
    "https://disease.sh/v2/countries?yesterday=true&sort=deaths&allowNull=false";
const recoveredStats =
    "https://disease.sh/v2/countries?yesterday=true&sort=recovered&allowNull=false";

const navLinkStyle = {
    textDecoration: "none",
    color: "black",
};

const totalCasesStyle = {
    backgroundColor: "lightgrey",
    padding: "16px",
};

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
        const totalData = await fetchTotalCases();
        this.setState({
            cases: totalData.cases,
            deaths: totalData.deaths,
            recovered: totalData.recovered,
        });

        await fetch(casesStatsURL)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    casesByCountry: data.map((element) => (
                        <Country
                            flag={element.countryInfo.flag}
                            name={element.country}
                            value={element.cases}
                        />
                    )),
                });
            })
            .catch((err) => console.log(err));

        await fetch(deathStats)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    deathsByCountry: data.map((element) => (
                        <Country
                            flag={element.countryInfo.flag}
                            name={element.country}
                            value={element.deaths}
                        />
                    )),
                });
            })
            .catch((err) => console.log(err));

        await fetch(recoveredStats)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    recoveredByCountry: data.map((element) => (
                        <Country
                            flag={element.countryInfo.flag}
                            name={element.country}
                            value={element.recovered}
                        />
                    )),
                });
            })
            .catch((err) => console.log(err));
        generateMap();
    }

    render() {
        return (
            <HashRouter>
                <div className="content">
                    <div className="left">
                        <div className="topnav">
                            <NavLink to="/cases">Cases</NavLink>
                            <NavLink to="/deaths">Deaths</NavLink>
                            <NavLink to="/recovered">Recovered</NavLink>
                        </div>
                        <Route exact path={["/cases", "/"]}>
                            <h1 style={totalCasesStyle} className="text-center">
                                {this.state.cases.toLocaleString()}
                            </h1>
                            {this.state.casesByCountry.map((element, index) => (
                                <NavLink
                                    key={index}
                                    style={navLinkStyle}
                                    to={"/" + element.props.name}
                                >
                                    {element}
                                </NavLink>
                            ))}
                        </Route>
                        <Route path="/deaths">
                            <h1 style={totalCasesStyle} className="text-center">
                                {this.state.deaths.toLocaleString()}
                            </h1>
                            {this.state.deathsByCountry.map(
                                (element, index) => (
                                    <NavLink
                                        key={index}
                                        style={navLinkStyle}
                                        to={"/" + element.props.name}
                                    >
                                        {element}
                                    </NavLink>
                                )
                            )}
                        </Route>
                        <Route path="/recovered">
                            <h1 style={totalCasesStyle} className="text-center">
                                {this.state.recovered.toLocaleString()}
                            </h1>
                            {this.state.recoveredByCountry.map(
                                (element, index) => (
                                    <NavLink
                                        key={index}
                                        style={navLinkStyle}
                                        to={"/country/" + element.props.name}
                                    >
                                        {element}
                                    </NavLink>
                                )
                            )}
                        </Route>
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
