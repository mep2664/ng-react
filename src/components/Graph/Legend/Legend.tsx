import * as React from "react";
import styled from "styled-components";

export interface ILegendData {
    Caption: string;
    Color: string;
    Value: number;
    PercentOfTotal: number;
}

interface ILegend {
    Data: ILegendData[];
}

const LegendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 20px;
`;

const SegmentWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 2.5px;
`;

interface ISegmentColor {
    BackgroundColor: string;
}
const SegmentColor = styled.div<ISegmentColor>`
    background-color: ${(props) => props.BackgroundColor}
    padding: 6px;
    margin-right: 5px;
`;

const SegmentDescription = styled.span`
    white-space: nowrap;
`;

export const Legend: React.FC<ILegend> = ({Data}) => {
    return (
        <LegendWrapper>
            {Data.map((segment) =>
                <SegmentWrapper>
                    <SegmentColor BackgroundColor={segment.Color}/>
                    <SegmentDescription>
                        {`${segment.Caption} = ${(segment.PercentOfTotal > 1 ? segment.PercentOfTotal : segment.PercentOfTotal * 100).toFixed(2)}%`}
                    </SegmentDescription>
                </SegmentWrapper>
            )}
        </LegendWrapper>
    );
}