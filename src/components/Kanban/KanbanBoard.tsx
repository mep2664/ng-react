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


export const KanbanBoard: React.FC<IKanbanBoard> = ({ initialPanels, initialItems }) => {
    // TODO: add / remove panel?
    const [panels, setPanels] = React.useState(_.cloneDeep(initialPanels));
    const [items, setItems] = React.useState(_.cloneDeep(initialItems));
    const [isSorting, setIsSorting] = React.useState<boolean>(false);

    React.useLayoutEffect(() => {
        console.log(isSorting);
    }, [isSorting]);

    const dropEvent = (panel: IKanbanPanel, droppedItem: IKanbanItem, hasDropped: boolean) => {
        setIsSorting(true);
        if (panel.title !== droppedItem.panel) {
            let sortedItems = items;
            if (!hasDropped) {
                if (droppedItem.index < panel.firstItemIndex!) {
                    sortedItems = sortItems(droppedItem.index,
                        panel.firstItemIndex! - 2 > 0 ? panel.firstItemIndex! - 2 : 0);
                } else if (droppedItem.index > panel.firstItemIndex!) {
                    sortedItems = sortItems(droppedItem.index, panel.firstItemIndex!);
                }
            }
            const item = sortedItems.find((item) => item.name === droppedItem.name) as IKanbanItem;
            item.panel = panel.title;
            if (panel.onDrop) {
                panel.onDrop(panel, item);
            }
            setItems(sortedItems);
        }
        setIsSorting(false);
    }

    const sortItems = (startIndex: number, endIndex: number): IKanbanItem[] => {
        const sorted = _.cloneDeep(items.sort((a, b) => a.index - b.index));
        if (startIndex !== endIndex) {
            if (startIndex < endIndex) {
                sorted[startIndex].index = endIndex - 1;
                let index = endIndex - 1;
                while (index > startIndex) {
                    sorted[index].index = --index;
                }
            } else if (startIndex > endIndex) {
                sorted[startIndex].index = endIndex;
                let index = endIndex;
                while (index < startIndex) {
                    sorted[index].index = ++index;
                }
            }
            const newItems = Array.from(sorted.sort((a, b) => a.index! - b.index!));
            items[startIndex].onDrop!(newItems);
            return newItems;
        }
        return sorted;
    }

    const handleItemSort = (startIndex: number, endIndex: number) => {
        setIsSorting(true);
        const sortedItems = sortItems(startIndex, endIndex);
        setItems(sortedItems);
        setIsSorting(false);
    }

    let indexOffset = 0;
    let lastIndex = -1;
    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanWrapper numColumns={panels.length}>
                {panels.map((panel, panelIndex) => {
                    const panelItems = items.filter((item) => item.panel === panel.title);
                    panelItems.forEach((item) => {
                        if (item.index === -1) {
                            item.index = lastIndex + 1;
                            indexOffset++;
                        } else {
                            item.index = item.index + indexOffset;
                        }
                        lastIndex = item.index;
                    });
                    panel.firstItemIndex = 0;
                    if (panelItems.length > 0) {
                        panel.firstItemIndex = panelItems[0].index;
                    } else if (panelIndex > 0) {
                        const lastPanelItems = items.filter((item) => item.panel === panels[panelIndex - 1].title);
                        // first index is 1 higher than the last index of the previous panel
                        panel.firstItemIndex = lastPanelItems[lastPanelItems.length - 1].index + 1;
                    }
                    return (
                        <KanbanPanel
                            key={panel.title}
                            title={panel.title}
                            subtitle={panel.subtitle}
                            accept={panel.accepts}
                            onDrop={(item, hasDropped) => dropEvent(panel, item, hasDropped)}
                        >
                            <div>
                                <span>hahahaha</span>
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
                {isSorting && <Updating key="loader"><FixedContainer><CircleLoader /></FixedContainer></Updating>}
            </KanbanWrapper>
        </DndProvider>
    )
};
