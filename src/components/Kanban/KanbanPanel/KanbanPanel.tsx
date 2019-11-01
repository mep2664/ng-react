import * as React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { bgColor, fontColor } from "../../../theme";

const PanelWrapper = styled.div`
    width: 250px;
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
    font-size: 18px;
    margin: 0;
    margin-bottom: 3px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

const PanelBody = styled.div<{ isHovering: boolean }>`
    background-color: ${(props) => props.isHovering ? bgColor.Dark : "transparent"};
`;

export interface IKanbanPanelProps {
    title: string;
    subtitle: string;
    accept: string[]
    lastDroppedItem?: any
    onDrop: (item: any) => void
}

export const KanbanPanel: React.FC<IKanbanPanelProps> = ({ children, title, subtitle, accept, lastDroppedItem, onDrop }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    return (
        <PanelWrapper ref={drop}>
            <div>
                <PanelTitle>{title}</PanelTitle>
                {subtitle ? (<PanelSubTitle title={subtitle}>{subtitle}</PanelSubTitle>) : undefined}
            </div>
            {children}
        </PanelWrapper>
    );
};
