import React from 'react';
import './App.css';
import { PageHeader, PieChart } from "./components";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <PageHeader />
            <div style={{height: "150px"}}>
                <PieChart
                    Data={[
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
                    ]}
                    PercentStrokeWidth={1}
                />
            </div>
        </React.Fragment>
  );
}

export default App;
