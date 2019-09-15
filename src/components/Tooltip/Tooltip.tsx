import * as React from "react";
import styled from "styled-components";
import { decode } from "he";

interface IBorders {
    BorderTop: string;
    BorderBottom: string;
    BorderLeft: string;
    BorderRight: string;
}

interface ITooltipContainer {
    AfterTop: string;
    AfterLeft: string;
    AfterBorders: IBorders;
    AfterMargin: string;
}
const TooltipContainer = styled.div<ITooltipContainer>`
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    color: black;
    pointer-events: none;
    border: 1px solid black;
    padding: 1em;

    &:after {
        content:'';
        position: absolute;
        top: ${(props) => props.AfterTop};
        left: ${(props) => props.AfterLeft};
        margin: ${(props) => props.AfterMargin};
        width: 0;
        height: 0;
        border-top: ${(props) => props.AfterBorders.BorderTop};
        border-bottom: ${(props) => props.AfterBorders.BorderBottom};
        border-left: ${(props) => props.AfterBorders.BorderLeft};
        border-right: ${(props) => props.AfterBorders.BorderRight};
    }
`;

interface ITooltip {
    Caption: string;
    Top: number;
    Left: number;
    Position: "Top" | "Bottom" | "Left" | "Right";
}

export const Tooltip: React.FC<ITooltip> = ({Caption, Top, Left, Position}) => {
    const [top, setTop] = React.useState(Top);
    const [left, setLeft] = React.useState(Left);
    const tooltip = React.useRef<HTMLDivElement>(null);



    const getAfterTop = ():string => {
        switch(Position) {
            case "Top":
                return "100%";
            case "Bottom":
                return "0%";
            case "Left" || "Right":
                return "50%";
            default:
                return "100%";
        }
    }

    const getAfterLeft = ():string => {
        switch(Position) {
            case "Top" || "Bottom":
                return "50%";
            case "Left":
                return "0%";
            case "Right":
                return "100%";
            default:
                return "50%";
        }
    }

    const getBorders = ():IBorders => {
        switch(Position) {
            case "Top":
                return {
                    BorderTop: "solid 10px black",
                    BorderBottom: "none",
                    BorderLeft: "solid 10px transparent",
                    BorderRight: "solid 10px transparent",
                }
            case "Bottom":
                return {
                    BorderTop: "none",
                    BorderBottom: "solid 10px black",
                    BorderLeft: "solid 10px transparent",
                    BorderRight: "solid 10px transparent",
                }
            case "Left":
                return {
                    BorderTop: "solid 10px transparent",
                    BorderBottom: "solid 10px transparent",
                    BorderLeft: "none",
                    BorderRight: "solid 10px black",
                }
            case "Right":
                return {
                    BorderTop: "solid 10px transparent",
                    BorderBottom: "solid 10px transparent",
                    BorderLeft: "solid 10px black",
                    BorderRight: "none",
                }
            default:
                return {
                    BorderTop: "solid 10px black",
                    BorderBottom: "none",
                    BorderLeft: "solid 10px transparent",
                    BorderRight: "solid 10px transparent",
                }
        }
    }

    const getMargin = () => {
        switch(Position) {
            case "Top":
                return "0 0 0 -10px";
            case "Bottom":
                return "-10px 0 0 -10px";
            case "Left":
                return "-10px 0 0 -10px";
            case "Right":
                return "-10px 0 0 0";
            default:
                return "0 0 0 -10px";
        }
    }

    React.useEffect(() => {
        if (tooltip.current) {
            tooltip.current.style.display = "block";
            setTop(Top - tooltip.current.offsetHeight - 10)
            setLeft(Left - (tooltip.current.offsetWidth / 2))
        }
    }, [Top, Left]);

    return (
        <TooltipContainer
            ref={tooltip}
            style={{top: `${top}px`, left: `${left}px`, display: "none"}}
            AfterTop={getAfterTop()}
            AfterLeft={getAfterLeft()}
            AfterBorders={getBorders()}
            AfterMargin={getMargin()}
            
        >
            {decode(Caption)}
        </TooltipContainer>
    );
}