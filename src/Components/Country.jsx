import React from "react";

const spanStyle = {
    fontSize: "24px",
};

const imageStyle = {
    margin: "8px",
    width: "50px",
    heigth: "30px",
};

class Country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            flag: props.flag,
        };
    }
    render() {
        return (
            <div>
                <img style={imageStyle} src={this.props.flag} alt=""></img>
                <span style={spanStyle}>
                    {(this.props.value).toLocaleString()}
                    {" in "}
                    {this.props.name}
                </span>
            </div>
        );
    }
}

export default Country;
