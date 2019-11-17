import * as React from "react";
import styled from "styled-components";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { bgColor } from "../../theme";
import { CircleLoader } from "../../components";
import { IKanbanBoard, IKanbanItem, KanbanItem, KanbanPanel, IKanbanPanel } from ".";
import * as _ from "lodash";

interface IKanbanWrapper {
    numColumns: number;
}
const KanbanWrapper = styled.div<IKanbanWrapper>`
    position: relative;
    display: grid;
    grid-template-columns: repeat(${({ numColumns }) => numColumns}, 1fr);
    background-color: ${bgColor.Light};
`;

const Updating = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${bgColor["Overlay"]};
`;

const FixedContainer = styled.div`
    position: fixed;
    top: 45%;
    display: flex;
    justify-content: center;
    width: 100%; 
`;


const KanbanBoard: React.FC<IKanbanBoard> = ({ initialPanels, initialItems }) => {
    // TODO: add / remove panel?
    const [panels, setPanels] = React.useState(_.cloneDeep(initialPanels));
    const [items, setItems] = React.useState(_.cloneDeep(initialItems));
    const [isSorting, setIsSorting] = React.useState<boolean>(false);

    const dropEvent = (panel: IKanbanPanel, droppedItem: IKanbanItem, hasDropped: boolean) => {
        if (!isSorting) {
            setIsSorting(true);
        }
        if (panel.title !== droppedItem.panel) {
            if (!hasDropped) {
                sortItems(droppedItem, panel.firstItem!);
            }
            const item = items.find((item) => item.name === droppedItem.name) as IKanbanItem;
            item.panel = panel.title;
            if (panel.onDrop) {
                panel.onDrop(panel, item);
            }
        }
        setIsSorting(false);
    }

    const sortItems = (startItem: IKanbanItem, endItem: IKanbanItem): IKanbanItem[] => {
        if (startItem !== endItem) {
            const startIndex = items.indexOf(startItem);
            items.splice(startIndex, 1);
            const endIndex = items.indexOf(endItem);
            items.splice(endIndex, 0, startItem);
            items[endIndex].onDrop!(items);
            return items;
        }
        return items;
    }

    const handleItemSort = (startItem: IKanbanItem, endItem: IKanbanItem) => {
        if (!isSorting) {
            setIsSorting(true);
        }
        sortItems(startItem, endItem);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <button onClick={() => setIsSorting(!isSorting)}>is sorting?</button>
            <KanbanWrapper numColumns={panels.length}>
                {isSorting && <Updating key="loader">{console.log(isSorting)}<FixedContainer><CircleLoader /></FixedContainer></Updating>}
                {panels.map((panel) => {
                    const panelItems: IKanbanItem[] = items.filter((item) => item.panel === panel.title);
                    panel.firstItem = panelItems[0];

                    return (
                        <KanbanPanel
                            key={panel.title}
                            title={panel.title}
                            subtitle={panel.subtitle}
                            accept={panel.accepts}
                            onDrop={(item, hasDropped) => dropEvent(panel, item, hasDropped)}
                        >
                            <div>
                                {panelItems.map((item: IKanbanItem) => {
                                    return (
                                        <KanbanItem
                                            key={item.name}
                                            item={item}
                                            onDrop={handleItemSort}
                                        />
                                    );
                                })}
                            </div>
                        </KanbanPanel>
                    );
                })}
            </KanbanWrapper>
        </DndProvider>
    )
};

const arePropsEqual = (prevProps: IKanbanBoard, nextProps: IKanbanBoard) => {
    if (prevProps.initialItems === nextProps.initialItems && prevProps.initialPanels === nextProps.initialPanels) {
        return true;
    }
    return false;
}

export default React.memo(KanbanBoard, arePropsEqual);