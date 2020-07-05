import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const datesInfoUrl = "https://disease.sh/v2/historical/all?lastdays=10";

class chart extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        const response = await (await fetch(datesInfoUrl)).json();
        const casesDates = Object.keys(response.cases);

        const chartData = [];

        casesDates.map((element, index) => {
            return chartData.push({
                Date: new Date(element).toLocaleDateString(),
                Cases: Object.values(response.cases)[index],
                Deaths: Object.values(response.deaths)[index],
                Recovered: Object.values(response.recovered)[index],
            });
        });

        this.setState({
            data: chartData,
        });
    }

    render() {
        return (
            <BarChart
                width={1000}
                height={300}
                data={this.state.data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Cases" stackId="a" fill="blue" />
                <Bar dataKey="Recovered" stackId="a" fill="green" />
                <Bar dataKey="Deaths" stackId="a" fill="red" />
            </BarChart>
        );
    }
}

export default chart;
