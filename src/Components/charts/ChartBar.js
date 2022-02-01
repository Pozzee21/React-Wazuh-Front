import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class CharBar extends PureComponent {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            data: [],
            total_items: 0,
            dataChart: []
        };
    }

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });

    };

    getDataConverted(dato) {
        var dataConverted = []
        dato.map(element => {
            var i = { name: "", value: 0 };
            i.name = "Agent: " + element.id;
            i.value = element.total_alerts;
            dataConverted.push(i);
        })
        dataConverted = dataConverted.sort((a,b)=>{
            return parseInt(a.name.substring(6,10)) - parseInt(b.name.substring(6,));
        });
        this.setState({ dataChart: dataConverted })
    }
    componentDidMount() {
        var uri = '/agents?offset=0&limit=99';
        fetch(uri)
            .then(res => { return res.json() })
            .then(res => this.setState({ data: res.data }, () => this.getDataConverted(res.data)));
    }
    render() {
        return (
            <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                    width="100%"
                    height="100%"
                    data={this.state.dataChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
