import * as React from "react";
import styled from "styled-components";

export interface IAxisData {
    Caption: string;
    Color: string;
    Value: number;
    PercentOfTotal: number;
}

interface IAxis {
}

const AxisWrapper = styled.svg`
    height: 350px;
    width: 550px;
    padding: 25px;
`;

const Line = styled.line`
    stroke: black;
    stroke-width: 2;
`;

export const Axis: React.FC<IAxis> = () => {
    return (
        <AxisWrapper viewBox="0 0 550 350">
            <g>
                <Line x1={50} x2={50} y1={50} y2={350}/>
            </g>
            <g>
                <Line x1={50} x2={550} y1={350} y2={350}/>
            </g>
        </AxisWrapper>
    );
}