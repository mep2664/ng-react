import * as React from "react";
import styled from "styled-components";

interface IGraphData {
    Caption: string;
    Value: number;
    PercentOfTotal: number;
}

interface IPieChart {
    Data: IGraphData[];
    PercentStrokeWidth: number;
}

const PieColors = [
    "red",
    "blue",
    "green",
    "purple",
    "yellow",
    "pink"
]

const Chart = styled.svg`
    pointer-events: stroke;
    overflow: visible;
    margin: 50px 0;
`;

interface ISegment {
    StrokeDasharray: string;
    StrokeDashoffset: number;
    StrokeWidth: number;
}
const Segment = styled.circle<ISegment>`
    transition: stroke-width .5s ease-in;
    stroke-dasharray:  ${(props) => props.StrokeDasharray};
    stroke-dashoffset: ${(props) => props.StrokeDashoffset};
    stroke-width: ${(props) => props.StrokeWidth};
    cursor: pointer;

    &:hover {
        stroke: black;
    }
`;

// stroke-width: ${(props) => props.StrokeWidth + .5};

export const PieChart: React.FC<IPieChart> = ({Data, PercentStrokeWidth}) => {
    const pieRadius: number = 10;
    const strokeWidth: number = pieRadius * ((PercentStrokeWidth > 1) ? (PercentStrokeWidth / 100) : PercentStrokeWidth);
    const segmentRadius: number = pieRadius - strokeWidth / 2;
    const maxPercentOfTotal: number = .95

    const renderPieSegments = () => {
        let strokeDashOffset: number = 0;
        const segments: JSX.Element[] = Data.map((segment, index) => {
            const circumference: number = 2*Math.PI*segmentRadius;
            let percentOfTotal = segment.PercentOfTotal;
            if (percentOfTotal > 1) {
                percentOfTotal = percentOfTotal / 100;
            }
            percentOfTotal = (percentOfTotal > maxPercentOfTotal ? maxPercentOfTotal : percentOfTotal)
            const currentOffset = strokeDashOffset;
            strokeDashOffset -= percentOfTotal * circumference;
            const strokeDashArray = `${percentOfTotal * circumference} ${(1 - percentOfTotal) * circumference}`;
            return (
                <Segment key={index} r={segmentRadius} cx={pieRadius} cy={pieRadius} fill="transparent"
                    stroke={PieColors[index]} StrokeWidth={strokeWidth} StrokeDashoffset={currentOffset}
                    StrokeDasharray= {strokeDashArray}
                />
            );
        });
        return segments;
    }

    return (
        <Chart height="100%" width="100%" viewBox="0 0 20 20">
            <circle r={pieRadius} cx={pieRadius} cy={pieRadius} fill="transparent" />
            {renderPieSegments()}
        </Chart>
    );
}