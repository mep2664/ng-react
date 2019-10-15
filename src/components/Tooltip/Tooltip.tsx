import { decode } from "he";
import * as React from "react";
import styled from "styled-components";

interface IBorders {
    BorderTop: string;
    BorderBottom: string;
    BorderLeft: string;
    BorderRight: string;
}

interface ITooltipContainer {
    Top: number | undefined;
    Left: number | undefined;
    AfterTop: string;
    AfterLeft: string | undefined;
    AfterBorders: IBorders;
    AfterMargin: string;
}

const TooltipContainer = styled.div<ITooltipContainer>`
    position: absolute;
    background-color: #000;
    color: #fff;
    pointer-events: none;
    border-radius: 5px;
    padding: 1em;
    top: ${(props) => props.Top}px;
    left: ${(props) => props.Left}px;
    max-width: 150px;

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

interface IMousePosition {
    MouseX: number;
    MouseY: number;
}

export type PositionType = "Top" | "Bottom" | "Left" | "Right" | undefined;
interface ITooltip {
    Caption: string;
    AnchorElement: HTMLElement | IMousePosition;
    Position?: PositionType;
}

const getTop = (position: PositionType, anchor: HTMLElement, tooltip: HTMLDivElement) => {
    if (tooltip) {
        let top: number;
        switch (position) {
            case "Bottom":
                top = anchor.offsetTop + anchor.offsetHeight + 5;
                break;
            case "Left":
                top = anchor.offsetTop - ((tooltip.offsetHeight - anchor.offsetHeight) / 2);
                break;
            case "Right":
                top = anchor.offsetTop - ((tooltip.offsetHeight - anchor.offsetHeight) / 2);
                break;
            default:
                // default to "Top"
                top = anchor.offsetTop - tooltip.offsetHeight - 5;
                break;
        }
        return top;
    }
};

const getLeft = (position: PositionType, anchor: HTMLElement, tooltip: HTMLDivElement) => {
    if (tooltip) {
        let left: number;
        switch (position) {
            case "Left":
                left = anchor.offsetLeft - tooltip.offsetWidth - 5;
                break;
            case "Right":
                left = anchor.offsetLeft + anchor.offsetWidth + 5;
                break;
            default:
                // default to "Top", which is also "Bottom" in this case
                left = anchor.offsetLeft - ((tooltip.offsetWidth - anchor.offsetWidth) / 2);
                break;
        }
        if (left < 0 && position !== "Left" && position !== "Right") {
            left = 0;
        } else if (tooltip.offsetWidth > (anchor.offsetParent ? anchor.offsetParent as HTMLElement : anchor).offsetWidth - anchor.offsetLeft - ((tooltip.offsetWidth - anchor.offsetWidth) / 2)
            && position !== "Left" && position !== "Right") {
            left = anchor.offsetLeft + anchor.offsetWidth - tooltip.offsetWidth;
        }
        return left;
    }
};

const getAfterTop = (position: PositionType): string => {
    switch (position) {
        case "Bottom":
            return "0%";
        case "Left":
            return "50%";
        case "Right":
            return "50%";
        default:
            // default to "Top"
            return "100%";
    }
};

const getAfterLeft = (position: PositionType): string => {
    switch (position) {
        case "Left":
            return "100%";
        case "Right":
            return "0%";
        default:
            // default to "Top" which is also bottom in this case
            return "50%";
    }
};

const getBorders = (position: PositionType): IBorders => {
    switch (position) {
        case "Bottom":
            return {
                BorderTop: "none",
                BorderBottom: `solid 5px #000`,
                BorderLeft: "solid 5px transparent",
                BorderRight: "solid 5px transparent",
            };
        case "Left":
            return {
                BorderTop: "solid 5px transparent",
                BorderBottom: "solid 5px transparent",
                BorderLeft: `solid 5px #000`,
                BorderRight: "none",
            };
        case "Right":
            return {
                BorderTop: "solid 5px transparent",
                BorderBottom: "solid 5px transparent",
                BorderLeft: "none",
                BorderRight: `solid 5px #000`,
            };
        default:
            // default to "Top"
            return {
                BorderTop: `solid 5px #000`,
                BorderBottom: "none",
                BorderLeft: "solid 5px transparent",
                BorderRight: "solid 5px transparent",
            };
    }
};

const getMargin = (position: PositionType) => {
    switch (position) {
        case "Bottom":
            return "-5px 0 0 -5px";
        case "Left":
            return "-5px 0 0 0";
        case "Right":
            return "-5px 0 0 -5px";
        default:
            // default to "Top"
            return "0 0 0 -5px";
    }
};

// Params -
//  Caption: Text inside of the tooltip
//  AnchorElement: The element the tooltip is for
//  Position?: (Optional) The position of the tooltip in relation to AnchorElement, defaults to Top.
export const Tooltip: React.FC<ITooltip> = ({ Caption, AnchorElement, Position }) => {
    const tooltip = React.useRef<HTMLDivElement>(null);
    const [top, setTop] = React.useState<number | undefined>(undefined);
    const [left, setLeft] = React.useState<number | undefined>(undefined);
    const [afterLeft, setAfterLeft] = React.useState<string | undefined>(undefined);

    React.useLayoutEffect(() => {
        if (tooltip.current) {
            if (AnchorElement instanceof HTMLElement) {
                const tooltipLeft = getLeft(Position, AnchorElement, tooltip.current);
                setLeft(tooltipLeft);
                if (tooltipLeft === 0) {
                    setAfterLeft(`${AnchorElement.offsetLeft + (AnchorElement.offsetWidth / 2)}px`);
                } else if (tooltipLeft === AnchorElement.offsetLeft + AnchorElement.offsetWidth - tooltip.current.offsetWidth) {
                    setAfterLeft(`${tooltip.current.offsetWidth - (AnchorElement.offsetWidth / 2)}px`);
                } else {
                    setAfterLeft(getAfterLeft(Position));
                }
                setTop(getTop(Position, AnchorElement, tooltip.current));
                tooltip.current.style.display = "table";
            }
            else {
                setLeft((AnchorElement as IMousePosition).MouseX - (tooltip.current.offsetWidth / 2));
                setTop((AnchorElement as IMousePosition).MouseY - tooltip.current.offsetHeight - 10);
            }
        }
    }, [AnchorElement, tooltip, Position]);

    return (
        <TooltipContainer
            ref={tooltip}
            Top={top}
            Left={left}
            AfterTop={getAfterTop(Position)}
            AfterLeft={afterLeft}
            AfterBorders={getBorders(Position)}
            AfterMargin={getMargin(Position)}

        >
            {decode(Caption)}
        </TooltipContainer>
    );
};