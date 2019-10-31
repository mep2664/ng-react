import * as React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";
import { fontColor, bgColor } from "../../../theme";

// TODO: border: ${(props) => props.isDragging ? `2px solid ${props.indicatorColor}` : "0"};
const ItemWrapper = styled.div<{ indicatorColor: string, /*isDragging: boolean,*/ opacity: number }>`
    width: 100%;
    min-height: 50px;
    background-color: white;
    color: ${fontColor.Dark};
    border-top: 8px solid ${({ indicatorColor }) => indicatorColor};
    margin: 10px 0;
    user-select: none;
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    cursor: grab;
    display: grid;
    opacity: ${({ opacity }) => opacity};
    grid-template-columns: auto;
    grid-template-rows: 20px 30px;
    grid-gap: 5px;
    padding: 5px;
    box-sizing: border-box;

    &:hover {
        border: 2px solid ${({ indicatorColor }) => indicatorColor};
        border-top: 8px solid ${({ indicatorColor }) => indicatorColor};
    }
`;

const ItemTitle = styled.div`
    color: ${fontColor.Dark};
    font-size: 16px;
    margin: 0;
    margin-bottom: 5px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

const ItemDescription = styled.div`
    color: ${fontColor.Dark};
    font-size: 13px;
    margin: 0;
    margin-bottom: 5px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

export interface IKanbanItemProps {
    name: string;
    type: string;
    title: string;
    description: string;
    isDropped: boolean;
    indicatorColor: string;
    id: string;
}

export const KanbanItem: React.FC<IKanbanItemProps> = ({ id, name, isDropped, title, type, description, indicatorColor }) => {
    const [{ opacity }, drag] = useDrag({
        item: { name, type },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ItemWrapper
            ref={drag}
            opacity={opacity}
            indicatorColor={indicatorColor ? indicatorColor : bgColor.Primary}
        >
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
        </ItemWrapper>
    )
}
