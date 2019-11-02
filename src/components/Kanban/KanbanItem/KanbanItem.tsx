import * as React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { fontColor, bgColor } from "../../../theme";
import { IKanbanItem } from "../";
import { Link } from "react-router-dom";

// TODO: border: ${(props) => props.isDragging ? `2px solid ${props.indicatorColor}` : "0"};
const ItemWrapper = styled.div<{ indicatorColor: string, /*isDragging: boolean,*/ opacity: number }>`
    width: 100%;
    min-height: 60px;
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
    grid-template-rows: 20px minmax(40px, 50px);
    overflow: hidden;
    grid-gap: 10px;
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;

    &:hover {
        border: 2px solid ${({ indicatorColor }) => indicatorColor};
        border-top: 8px solid ${({ indicatorColor }) => indicatorColor};
        padding: 5px;
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

const ItemLink = styled(Link)`
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    color: #0a085f;

    &:hover {
        text-decoration: underline;
    }
`

const ItemDescription = styled.div`
    color: ${fontColor.Dark};
    font-size: 13px;
    margin: 0;
    margin-bottom: 5px;
    margin-block-start: 0;
    margin-block-end: 0;
    overflow: hidden;
`;

export interface IKanbanItemProps {
    item: IKanbanItem;
    onDrop?: (startIndex: number, endIndex: number) => void;
}

export const KanbanItem: React.FC<IKanbanItemProps> = ({ item, onDrop }) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: item.type,
        drop: (droppedItem: IKanbanItem) => {
            if (onDrop) {
                onDrop(droppedItem.index!, item.index!);
            }
        }
    });

    const [{ opacity }, drag] = useDrag({
        item: { name: item.name, type: item.type, description: item.description, panel: item.panel, index: item.index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    drag(drop(ref));
    return (
        <ItemWrapper
            ref={ref}
            opacity={opacity}
            indicatorColor={item.indicatorColor ? item.indicatorColor : bgColor.Primary}
        >
            <ItemTitle>{item.link && <ItemLink to={item.link.path}>{item.link.caption}:</ItemLink>} {item.name}</ItemTitle>
            <ItemDescription title={item.description}>{item.description}</ItemDescription>
        </ItemWrapper>
    )
}
