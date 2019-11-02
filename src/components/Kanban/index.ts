import { IKanbanItemProps } from "./KanbanItem";

export * from "./KanbanBoard";
export * from "./KanbanItem";
export * from "./KanbanPanel";

export interface IKanbanItem {
    name: string;
    type: string;
    description: string;
    panel: string; // panel name
    index: number;
    externalId?: string;
    indicatorColor?: string;
    onDrop?: (items: IKanbanItem[]) => void;
}

export interface IKanbanPanel {
    title: string;
    subtitle: string;
    accepts: string[];
    firstItemIndex?: number;
    onDrop?: (panel: IKanbanPanel, item: IKanbanItem) => void;
}

export interface IKanbanBoard {
    initialPanels: IKanbanPanel[];
    initialItems: IKanbanItem[];
}
