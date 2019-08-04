import * as React from "react";
import styled from "styled-components";
import { decode } from "he";

const TooltipContainer = styled.div`
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    color: black;
    pointer-events: none;
    border: 1px solid black;
    padding: 1em;
`;

interface ITooltip {
    Caption: string;
    Top: number;
    Left: number;
}

export const Tooltip: React.FC<ITooltip> = ({Caption, Top, Left}) => {

    return (
        <TooltipContainer
            style={{top: `${Top}px`, left: `${Left}px`}}
        >
            {decode(Caption)}
        </TooltipContainer>
    );
}