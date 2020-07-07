import React from "react";
import { Route, NavLink } from "react-router-dom";

import {
    generateMap,
    fetchTotalCases,
    getCasesByCountryList,
    getDeathsByCountryList,
    getRecoveredByCountryList,
} from "../Api.js";

const style = {
    backgroundColor: "lightgrey",
    padding: "16px",
};

const navLinkStyle = {
    textDecoration: "none",
    color: "black",
};

class Stats extends React.Component {

    componentDidMount() {
/*         generateMap(this.props.color) */
    }
    render() {
        generateMap(this.props.color)
        return (
            <div>
                <Route exact path={this.props.path}>
                    <h1 style={style} className="text-center">
                        {this.props.cases.toLocaleString()}
                    </h1>
                    {this.props.data.map((element, index) => (
                        <NavLink
                            key={index}
                            style={navLinkStyle}
                            to={"/" + element[1]}
                        >
                            {element[0]}
                        </NavLink>
                    ))}
                </Route>
            </div>
        );
    }
}

export default Stats;
