import * as React from "react";
import styled from "styled-components";
import { ILegendData, Legend } from "../";
import { Tooltip } from "../../";

interface IGraphData {
    Caption: string;
    Value: number;
    PercentOfTotal: number;
}

interface IPieChart {
    Data: IGraphData[];
    PercentStrokeWidth: number;
    Radius: number;
    HeightAndWidth: string;
}

const PieColors = [
    "red",
    "blue",
    "green",
    "purple",
    "yellow",
    "pink",
    "orange",
];

interface IChartWrapper {
    HeightAndWidth: string;
}
const ChartWrapper = styled.div<IChartWrapper>`
    height: ${(props) => props.HeightAndWidth};
    width: ${(props) => props.HeightAndWidth};
    display: flex;
`;

const Chart = styled.svg`
    pointer-events: stroke;
    overflow: visible;
`;

interface ISegment {
    StrokeDasharray: string;
    StrokeDashoffset: number;
    StrokeWidth: number;
}
const Segment = styled.circle<ISegment>`
    transition: stroke-width .25s ease-in;
    stroke-dasharray:  ${(props) => props.StrokeDasharray};
    stroke-dashoffset: ${(props) => props.StrokeDashoffset};
    stroke-width: ${(props) => props.StrokeWidth};
    cursor: pointer;

    &:hover, &[data-active="true"] {
        stroke-width: ${(props) => props.StrokeWidth + (props.StrokeWidth * .1)};
    }
`;

export const PieChart: React.FC<IPieChart> = ({Data, HeightAndWidth, PercentStrokeWidth, Radius}) => {
    const [tooltip, setTooltip] = React.useState(<React.Fragment></React.Fragment>);
    const [active, setActive] = React.useState(-1);

    const diameter = Radius * 2;
    const maxPercentStrokeWidth: number = .95
    if (PercentStrokeWidth > 1) {
        PercentStrokeWidth = PercentStrokeWidth / 100;
    }
    if (PercentStrokeWidth > maxPercentStrokeWidth) {
        PercentStrokeWidth = maxPercentStrokeWidth;
    }
    const strokeWidth: number = Radius * PercentStrokeWidth;
    const segmentRadius: number = Radius - strokeWidth / 2;
    const circumference: number = 2*Math.PI*segmentRadius;

    const renderPieSegments = () => {
        const legend: ILegendData[] = [];
        let strokeDashOffset: number = 0;
        const segments: JSX.Element[] = Data.map((segment, index) => {
            let percentOfTotal = segment.PercentOfTotal;
            if (percentOfTotal > 1) {
                percentOfTotal = percentOfTotal / 100;
            }

            legend.push({
                Caption: segment.Caption,
                Color: PieColors[index],
                PercentOfTotal: percentOfTotal,
                Value: segment.Value,
            });

            const currentOffset = strokeDashOffset;
            strokeDashOffset -= percentOfTotal * circumference;
            const strokeDashArray = `${(percentOfTotal * circumference)} ${(1 - percentOfTotal) * circumference}`;
            return (
                <Segment key={index} r={segmentRadius} cx={Radius} cy={Radius} fill="transparent"
                    stroke={PieColors[index]} StrokeWidth={strokeWidth} StrokeDashoffset={currentOffset}
                    StrokeDasharray= {strokeDashArray}
                    onMouseMove={(e) => setTooltip(<Tooltip Caption={`${segment.Caption}&#010;${segment.Value}(${(percentOfTotal*100).toFixed(2)}%)`} AnchorElement={{MouseX: e.clientX, MouseY: e.clientY}} Position="Top" />)}
                    onMouseOut={() => setTooltip(<React.Fragment></React.Fragment>)}
                    onClick={() => setActive(active === index ? -1 : index)}
                    data-active={index === active}
                />
            );
        });
        return segments;
    }

    const getLegendData = (): ILegendData[] => (
        Data.map((segment, index) => (
            {
                Caption: segment.Caption,
                Color: PieColors[index],
                PercentOfTotal: segment.PercentOfTotal,
                Value: segment.Value,
            }
        ))
    );

    return (
        <React.Fragment>
            <ChartWrapper HeightAndWidth={HeightAndWidth}>
                <Chart height="100%" width="100%" viewBox={`0 0 ${diameter} ${diameter}`}
                    onMouseOut={() => setTooltip(<React.Fragment></React.Fragment>)}
                >
                    <circle r={Radius + 5} cx={Radius} cy={Radius} fill="white"/>
                    {renderPieSegments()}
                </Chart>
                <Legend Data={getLegendData()}/>
            </ChartWrapper>
            {tooltip}
        </React.Fragment>
    );
}