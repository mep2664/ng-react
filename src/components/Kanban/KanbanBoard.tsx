import * as React from "react";
import styled from "styled-components";
import { bgColor } from "../../theme";
import { IKanbanBoard, IKanbanItem, KanbanPanel, IKanban } from ".";
import * as _ from "lodash";

const KanbanWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
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

export const KanbanBoard: React.FC<IKanbanBoard> = ({ initialPanels, onPanelChange, onOrderChange }) => {
    // TODO: add / remove panel?
    const [panels, setPanels] = React.useState(Array.from(initialPanels));
    const [allItems, setAllItems] = React.useState(initialPanels.reduce((acc, curr) => acc.concat(curr.items), new Array<IKanbanItem>()));

    const handleChange = (panel: string, itemIds: string[]) => {
        const changedPanel = panels.find((p) => p.panel === panel) as IKanban;
        changedPanel.items = itemIds.map((id) => allItems.find((item) => item.externalId === id)!);
        setPanels(Array.from(panels));
    }

    const handleAdd = (panel: string, e: any) => {
        const changedItemId = e.item.getAttribute("data-id");
        onPanelChange(panel, changedItemId);
        onOrderChange(panels);
    }

    const handleEnd = (e: any) => {
        if (e.from === e.to) {
            onOrderChange(panels);
        }
    }

    return (
        <KanbanWrapper>
            {panels.map(({ panel, items }) => {
                return (
                    <KanbanPanel
                        key={panel}
                        title={panel}
                        items={items}
                        onChange={handleChange}
                        onAdd={handleAdd}
                        onEnd={handleEnd}
                    />
                );
            })}
        </KanbanWrapper>
    )
};
