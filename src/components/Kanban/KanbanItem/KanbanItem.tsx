import * as React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { fontColor, bgColor } from "../../../theme";
import { IKanbanItem } from "../";
import { Link } from "react-router-dom";

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
    overflow: hidden;
    grid-gap: 5px;
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
`;

export interface ILink {
    caption: string;
    path: string;
}

export interface IKanbanItemProps {
    name: string;
    link?: ILink;
    type: string;
    description: string;
    panel: string;
    index?: number;
    indicatorColor: string;
    onDrop?: (startIndex: number, endIndex: number) => void;
}

export const KanbanItem: React.FC<IKanbanItemProps> = ({ name, link, type, description, panel, index, indicatorColor, onDrop }) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: type,
        drop: (item: IKanbanItem) => {
            if (onDrop) {
                onDrop(item.index!, index!);
            }
        }
    });

    const [{ opacity }, drag] = useDrag({
        item: { name, type, description, panel, index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    drag(drop(ref));
    return (
        <ItemWrapper
            ref={ref}
            opacity={opacity}
            indicatorColor={indicatorColor ? indicatorColor : bgColor.Primary}
        >
            <ItemTitle>{link && <ItemLink to={link.path}>{link.caption}:</ItemLink>} {name}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
        </ItemWrapper>
    )
}
