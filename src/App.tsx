import React from 'react';
import './App.css';
import { PageHeader, PieChart, Tooltip } from "./components";

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
        Value: 32.75,
        PercentOfTotal: (32.75 / 215),
    },
    {
        Caption: "G",
        Value: 2.15,
        PercentOfTotal: (2.15 / 215),
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
    const [tooltip, setTooltip] = React.useState(<React.Fragment></React.Fragment>);
    const button = React.useRef<HTMLButtonElement>(null);

    const handleMouseOver = () => {
        if (button.current) {
            setTooltip(
                <Tooltip
                    Caption="Tooltip!"
                    Top={(button.current).offsetTop}
                    Left={(button.current).offsetLeft + (button.current.offsetWidth / 2)}
                    Position="Top"
                />
            );
        }
    }

    return (
        <React.Fragment>
            <PageHeader />
            <div style={{height: "200px", margin: "50px"}}>
                <PieChart
                    Data={data1}
                    PercentStrokeWidth={50}
                    Radius={100}
                    HeightAndWidth="200px"
                />
            </div>
            <div style={{margin: "50px"}}>
                <button
                    ref={button}
                    onMouseOver={handleMouseOver}
                    onMouseOut={() => setTooltip(<React.Fragment></React.Fragment>)}
                >
                    Test Tooltip
                </button>
            </div>
            {tooltip}
        </React.Fragment>
  );
}

export default App;
