import * as React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { bgColor, fontColor } from "../../../theme";

const PanelWrapper = styled.div`
    width: 200px;
    min-height: 500px;
    background-color: white;
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    -moz-box-shadow: rgba(0,0,0,0.3) 0 1px 3px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 15px;
    padding: 15px;
    margin: 10px;
`;

const PanelTitle = styled.h1`
    color: ${fontColor.Dark};
    font-size: 27px;
    margin: 0;
    margin-bottom: 5px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

const PanelSubTitle = styled.h2`
    color: ${fontColor.Dark};
    font-size: 20px;
    margin: 0;
    margin-bottom: 3px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

const PanelBody = styled.div<{ isHovering: boolean }>`
    background-color: ${(props) => props.isHovering ? bgColor.Dark : "transparent"};
`;

export const KanbanPanel: React.FC<{ children: React.ReactNode, id: number, title: string, subtitle?: string }> = ({ children, id, title, subtitle }) => {
    return (
        <PanelWrapper>
            <div>
                <PanelTitle>{title}</PanelTitle>
                {subtitle ? (<PanelSubTitle>{subtitle}</PanelSubTitle>) : undefined}
            </div>
            <Droppable droppableId={id.toString()} type="TypeOne">
                {(provided, snapshot) => (
                    <PanelBody
                        ref={provided.innerRef}
                        isHovering={snapshot.isDraggingOver}
                    >
                        {children}
                        {provided.placeholder}
                    </PanelBody>
                )}
            </Droppable>
        </PanelWrapper>
    );
};
