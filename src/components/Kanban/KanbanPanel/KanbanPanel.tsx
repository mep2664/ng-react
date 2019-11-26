import * as React from "react";
import styled from "styled-components";
import { bgColor, fontColor } from "../../../theme";
import ReactSortable from "react-sortablejs";
import { IKanbanItem, KanbanItem } from "../";

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
    items: IKanbanItem[];
    title: string;
    onChange: (panel: string, itemIds: string[]) => void;
    onAdd: (panel: string, e: any) => void;
    onEnd: (e: any) => void;
}

export const KanbanPanel: React.FC<IKanbanPanelProps> = ({ items, title, onChange, onAdd, onEnd }) => {
    return (
        <PanelWrapper>
            <PanelTitle>{title}</PanelTitle>
            <ReactSortable options={{ group: "shared", onAdd: (e) => onAdd(title, e), onEnd: onEnd }} onChange={(itemIds: string[]) => onChange(title, itemIds)} >
                {items.map((item) => <KanbanItem key={item.name} item={item} />)}
            </ReactSortable>
        </PanelWrapper>
    );
};
