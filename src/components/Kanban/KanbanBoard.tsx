import * as React from "react";
import styled from "styled-components";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { bgColor } from "../../theme";
import { IKanbanBoard, IKanbanItem, KanbanItem, KanbanPanel, IKanbanPanel } from ".";
import * as _ from "lodash";

const KanbanWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: ${bgColor.Light};
`;

export const KanbanBoard: React.FC<IKanbanBoard> = ({ initialPanels, initialItems }) => {
    // TODO: add / remove panel?
    const [panels, setPanels] = React.useState(_.cloneDeep(initialPanels));
    const [items, setItems] = React.useState(_.cloneDeep(initialItems));

    // TODO: will this bug out if all panels or items are deleted
    React.useEffect(() => {
        //if (panels.length === 0 && initialPanels.length > 0) {
        setPanels(_.cloneDeep(initialPanels));
        //}
        //if (items.length === 0 && initialItems.length > 0) {
        setItems(_.cloneDeep(initialItems));
        //}
    }, [initialPanels, initialItems])

    const dropEvent = (panel: IKanbanPanel, droppedItem: IKanbanItem, hasDropped: boolean) => {
        console.log(hasDropped);
        if (panel.title !== droppedItem.panel && !hasDropped) {
            if (droppedItem.index < panel.firstItemIndex!) {
                handleItemSort(droppedItem.index,
                    panel.firstItemIndex! - 2 > 0 ? panel.firstItemIndex! - 2 : 0);
            } else if (droppedItem.index > panel.firstItemIndex!) {
                handleItemSort(droppedItem.index, panel.firstItemIndex!);
            }
        }
        const item = items.find((item) => item.name === droppedItem.name) as IKanbanItem;
        item.panel = panel.title;
        if (panel.onDrop) {
            panel.onDrop(panel, item);
        }
        //setItems(Array.from(items));
    }

    const handleItemSort = (startIndex: number, endIndex: number) => {
        const sorted = _.cloneDeep(items.sort((a, b) => a.index - b.index));
        if (startIndex < endIndex) {
            sorted[startIndex].index = endIndex;
            let index = endIndex;
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
        //setItems(Array.from(newItems));
    }

    let indexOffset = 0;
    let lastIndex = -1;
    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanWrapper>
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
                            title={panel.title}
                            subtitle={panel.subtitle}
                            accept={panel.accepts}
                            onDrop={(item, hasDropped) => dropEvent(panel, item, hasDropped)}
                            key={panel.title}
                        >
                            <div>
                                {panelItems.map((item: IKanbanItem) => {
                                    return (
                                        <KanbanItem
                                            name={item.name}
                                            type="ticket"
                                            key={item.name}
                                            index={item.index}
                                            description={item.description}
                                            indicatorColor={item.indicatorColor as string}
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
