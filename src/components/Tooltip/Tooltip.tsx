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

    &:after {
        content:'';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -10px;
        width: 0;
        height: 0;
        border-top: solid 10px black;
        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
    }
`;

interface ITooltip {
    Caption: string;
    Top: number;
    Left: number;
}

export const Tooltip: React.FC<ITooltip> = ({Caption, Top, Left}) => {
    const [top, setTop] = React.useState(Top);
    const [left, setLeft] = React.useState(Left);
    const tooltip = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (tooltip.current) {
            setTop(Top - tooltip.current.offsetHeight - 10)
            setLeft(Left - (tooltip.current.offsetWidth / 2))
        }
    }, [Top, Left]);

    return (
        <TooltipContainer
            ref={tooltip}
            style={{top: `${top}px`, left: `${left}px`}}
        >
            {decode(Caption)}
        </TooltipContainer>
    );
}