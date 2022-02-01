import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class ChartLine extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      data: [],
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
      var i = { OS: "", value: 0 };
      i.OS = element._source.agent.name;
      if (dataConverted.find(((x => x.OS === i.OS)))) {
        var finded = dataConverted.find((x => x.OS === i.OS));
        finded.value = finded.value + 1;
      } else {
        i.value = 1;
        dataConverted.push(i);
      }
    })
    this.setState({ dataChart: dataConverted })
  }
  componentDidMount() {
    var uri = '/alerts?offset=0&limit=99';
    fetch(uri)
      .then(res => { return res.json() })
      .then(res => this.setState({ data: res.data }, () => this.getDataConverted(res.data)));
  }

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
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
          <XAxis dataKey="OS" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value"  stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
