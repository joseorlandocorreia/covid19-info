import React from "react";
import { Route, NavLink } from "react-router-dom";

const style = {
    backgroundColor: "lightgrey",
    padding: "16px",
};

const navLinkStyle = {
    textDecoration: "none",
    color: "black",
};

class RouteComponent extends React.Component {
    render() {
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

export default RouteComponent;
