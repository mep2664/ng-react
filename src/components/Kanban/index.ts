export * from "./KanbanBoard";
export * from "./KanbanItem";
export * from "./KanbanPanel";

export interface IKanbanItem {
    name: string;
    type: string;
    description: string;
    panel: string; // panel name
    indicatorColor?: string;
}

export interface IKanbanPanel {
    title: string;
    accepts: string[];
}

export interface IKanbanBoard {
    initialPanels: IKanbanPanel[];
    initialItems: IKanbanItem[];
}
