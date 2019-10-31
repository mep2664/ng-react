import * as React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { bgColor } from "../../theme";
import { IKanbanBoard, IKanbanPanel, IKanbanItem, KanbanItem, KanbanPanel } from ".";

const KanbanWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: ${bgColor.Light};
`;

export const KanbanBoard: React.FC<{ PanelsAndItems: IKanbanBoard }> = ({ PanelsAndItems }) => {
    const [panelsAndItems, setPanelsAndItems] = React.useState(PanelsAndItems);

    const dragEndEvent = (result: DropResult) => {

        // Grab result variables
        const { destination, source, draggableId } = result;

        // If there is no move
        if (!destination) {
            return;
        }

        // If it moved to the same place it started
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        // Get the panels from state
        const panels: IKanbanPanel[] = panelsAndItems.Panels;

        // Get the item that's being moved
        const sourcePanel = panels.find((panel) => panel.ID.toString() === source.droppableId) as IKanbanPanel;
        const movedItem = sourcePanel.Items.find((item) => item.ID.toString() === draggableId) as IKanbanItem;

        // Remove it from the source panel
        if (sourcePanel.Items.length === 1) {
            sourcePanel.Items.pop();
        } else { // TODO: why do we need an if / else here? can't we just splice using the index of the item no matter what?
            sourcePanel.Items.splice(
                sourcePanel.Items.indexOf(movedItem), 1);
        }

        // Add it to the destination panel
        const destinationPanel = panels.find((panel) => panel.ID.toString() === destination.droppableId) as IKanbanPanel;
        destinationPanel.Items.splice(destination.index, 0, movedItem);

        // Construct new object so React knows to rerender
        const newPanelsAndItems = {
            Panels: Array.from(panels),
        };

        // Update state
        setPanelsAndItems(newPanelsAndItems);
    }

    return (
        <DragDropContext onDragEnd={dragEndEvent}>
            <KanbanWrapper>
                {panelsAndItems && panelsAndItems.Panels.map((panel: IKanbanPanel, panelIndex) => {
                    return (
                        <KanbanPanel id={panel.ID} key={`panel-${panelIndex}`} title={panel.Title} subtitle="test">
                            {panel.Items.map((item: IKanbanItem) => {
                                return <KanbanItem
                                    id={item.ID}
                                    key={item.ID}
                                    title={item.Title}
                                    description={item.Description}
                                    indicatorColor={item.IndicatorColor}
                                />
                            })}
                        </KanbanPanel>
                    );
                })}
            </KanbanWrapper>
        </DragDropContext>
    );
};
