import * as React from "react";
import styled from "styled-components";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { bgColor } from "../../theme";
import { IKanbanBoard, IKanbanItem, KanbanItem, KanbanPanel } from ".";
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

    // TODO: not sure it is safe to set state every time we get new props
    React.useEffect(() => {
        if (!_.isEqual(initialPanels, panels)) {
            setPanels(_.cloneDeep(initialPanels));
        }
        if (!_.isEqual(initialItems, items)) {
            setItems(_.cloneDeep(initialItems));
        }
    }, [initialPanels, initialItems])

    const dragEndEvent = (panelIndex: any, droppedItem: any) => {
        const item = items.find((item) => item.name === droppedItem.name) as IKanbanItem;
        item.panel = panels[panelIndex].title;
        setItems(Array.from(items));
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanWrapper>
                {panels.map((panel, index) => (
                    <KanbanPanel
                        title={panel.title}
                        subtitle={"subtitle where are you coming from?"}
                        accept={panel.accepts}
                        onDrop={(item) => dragEndEvent(index, item)}
                        key={panel.title}
                    >
                        <div>
                            {items.filter((item) => item.panel === panel.title).map((item: IKanbanItem) =>
                                <KanbanItem
                                    name={item.name}
                                    type="ticket"
                                    isDropped={false}
                                    id={item.name}
                                    key={item.name}
                                    description={item.description}
                                    indicatorColor={item.indicatorColor as string}
                                />
                            )}
                        </div>
                    </KanbanPanel>
                ))}
            </KanbanWrapper>
        </DndProvider>
    )
};
