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

    return (
        <DndProvider backend={HTML5Backend}>
            <KanbanWrapper>
                {panels.map((panel) => (
                    <KanbanPanel
                        title={panel.title}
                        subtitle={"subtitle where are you coming from?"}
                        accept={panel.accepts}
                        onDrop={(item) => dropEvent(panel, item)}
                        key={panel.title}
                    >
                        <div>
                            {items.filter((item) => item.panel === panel.title).map((item: IKanbanItem) =>
                                <KanbanItem
                                    name={item.name}
                                    type="ticket"
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
