import React from "react";

import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink to="/cases">Cases</NavLink>
                <NavLink to="/deaths">Deaths</NavLink>
                <NavLink to="/recovered">Recovered</NavLink>
            </div>
        );
    }
}

export default Navbar