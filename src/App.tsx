import React from 'react';
import './App.css';
import { PageHeader, PieChart } from "./components";

const data1 = [
    {
        Caption: "A",
        Value: 50,
        PercentOfTotal: (50 / 215),
    },
    {
        Caption: "B",
        Value: 25,
        PercentOfTotal: (25 / 215),
    },
    {
        Caption: "C",
        Value: 75,
        PercentOfTotal: (75 / 215),
    },
    {
        Caption: "D",
        Value: 10,
        PercentOfTotal: (10 / 215),
    },
    {
        Caption: "E",
        Value: 20,
        PercentOfTotal: (20 / 215),
    },
    {
        Caption: "F",
        Value: 35,
        PercentOfTotal: (35 / 215),
    },
];

const data2 = [
    {
        Caption: "A",
        Value: 50,
        PercentOfTotal: (50 / 100),
    },
    {
        Caption: "B",
        Value: 50,
        PercentOfTotal: (50 / 100),
    },
];

const App: React.FC = () => {
    return (
        <React.Fragment>
            <PageHeader />
            <div style={{height: "200px"}}>
                <PieChart
                    Data={data1}
                    PercentStrokeWidth={50}
                    Radius={100}
                />
            </div>
        </React.Fragment>
  );
}

export default App;
