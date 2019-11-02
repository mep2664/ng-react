export * from "./KanbanBoard";
export * from "./KanbanItem";
export * from "./KanbanPanel";

export interface ILink {
    caption: string;
    path: string;
}

export interface IKanbanItem {
    name: string;
    type: string;
    link?: ILink;
    description: string;
    panel: string; // panel title
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
