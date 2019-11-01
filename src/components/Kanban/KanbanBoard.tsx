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
        if (panels.length === 0 && initialPanels.length > 0) {
            setPanels(_.cloneDeep(initialPanels));
        }
        if (items.length === 0 && initialItems.length > 0) {
            setItems(_.cloneDeep(initialItems));
        }
    }, [initialPanels, initialItems])

    const dropEvent = (panel: IKanbanPanel, droppedItem: any) => {
        const item = items.find((item) => item.name === droppedItem.name) as IKanbanItem;
        item.panel = panel.title;
        if (panel.onDrop) {
            panel.onDrop(panel, item);
        }
        setItems(Array.from(items));
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
        setItems(Array.from(sorted.sort((a, b) => a.index! - b.index!)));
    }

    let indexOffset = 0;
    let lastIndex = -1;
    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanWrapper>
                {panels.map((panel) => (
                    <KanbanPanel
                        title={panel.title}
                        subtitle={panel.subtitle}
                        accept={panel.accepts}
                        onDrop={(item) => dropEvent(panel, item)}
                        key={panel.title}
                    >
                        <div>
                            {items.filter((item) => item.panel === panel.title).map((item: IKanbanItem) => {
                                if (item.index === -1) {
                                    item.index = lastIndex + 1;
                                    indexOffset++;
                                } else {
                                    item.index = item.index + indexOffset;
                                }
                                lastIndex = item.index;
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
                ))}
            </KanbanWrapper>
        </DndProvider>
    )
};
