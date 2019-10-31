import { IKanbanItemProps } from "./KanbanItem";

export * from "./KanbanBoard";
export * from "./KanbanItem";
export * from "./KanbanPanel";

export interface IKanbanItem {
    name: string;
    type: string;
    description: string;
    panel: string; // panel name
    externalId?: string;
    indicatorColor?: string;
}

export interface IKanbanPanel {
    title: string;
    subtitle: string;
    accepts: string[];
    onDrop?: (panel: IKanbanPanel, item: IKanbanItem) => void;
}

export interface IKanbanBoard {
    initialPanels: IKanbanPanel[];
    initialItems: IKanbanItem[];
}
