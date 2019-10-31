import * as React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import { NativeTypes } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { bgColor } from "../../theme";
import { IKanbanBoard, IKanbanPanel, IKanbanItem, KanbanItem, KanbanPanel } from ".";
import * as _ from "lodash";

const KanbanWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: ${bgColor.Light};
`;

export const KanbanBoard: React.FC<IKanbanBoard> = ({ initialPanels, initialItems }) => {
    const [panels, setPanels] = React.useState(_.cloneDeep(initialPanels));
    const [items, setItems] = React.useState(_.cloneDeep(initialItems));

    const dragEndEvent = (panelIndex: any, droppedItem: any) => {
        console.log(panelIndex);
        console.log(droppedItem);
        const item = items.find((item) => item.name === droppedItem.name) as IKanbanItem;
        item.panel = panels[panelIndex].title;
        console.log(item);
        setItems(Array.from(items));
    }

    // const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])
    // const isDropped = (boxName: string) => droppedBoxNames.indexOf(boxName) > -1
    //   }

    console.log(items);

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {panels.map((panel, index) => (
                    <KanbanPanel
                        title={panel.title}
                        subtitle={"subtitle where are you coming from?"}
                        accept={panel.accepts}
                        lastDroppedItem={panel.lastDroppedItem}
                        onDrop={(item) => dragEndEvent(index, item)}
                        key={panel.title}
                    >
                        {items.filter((item) => item.panel === panel.title).map((item: IKanbanItem) =>
                            <KanbanItem
                                name={item.name}
                                type="ticket"
                                isDropped={false}
                                id={item.name}
                                key={item.name}
                                title={item.title}
                                description={item.description}
                                indicatorColor={item.indicatorColor as string}
                            />
                        )}
                    </KanbanPanel>
                ))}
            </div>
        </DndProvider>
    )
};
