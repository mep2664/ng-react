import * as React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { fontColor, bgColor } from "../../../theme";

const ItemWrapper = styled.div<{ indicatorColor: string, isDragging: boolean }>`
    width: 100%;
    min-height: 50px;
    background-color: white;
    color: ${fontColor.Dark};
    border: ${(props) => props.isDragging ? `2px solid ${props.indicatorColor}` : "0"};
    border-top: 8px solid ${(props) => props.indicatorColor};
    margin: 10px 0;
    user-select: none;
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    cursor: grab;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 20px 30px;
    grid-gap: 5px;
    padding: 5px;
    box-sizing: border-box;

    &:hover {
        border: ${(props) => `2px solid ${props.indicatorColor}`};
        border-top: 8px solid ${(props) => props.indicatorColor};
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

export const KanbanItem: React.FC<{ id: number, title: string, description: string, indicatorColor?: string }> = ({ id, title, description, indicatorColor }) => {
    return (
        <Draggable draggableId={id.toString()} index={id}>
            {(provided, snapshot) => (
                <ItemWrapper
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    indicatorColor={indicatorColor ? indicatorColor : bgColor.Primary}
                    isDragging={snapshot.isDragging}
                >
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemWrapper>
            )}
        </Draggable>
    );
};
