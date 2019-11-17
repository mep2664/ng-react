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
    index: number;
    externalId: string;
    indicatorColor?: string;
}

export interface IKanbanPanel {
    title: string;
    subtitle: string;
    accepts: string[];
    firstItemIndex?: number;
}

export interface IKanban {
    panel: string;
    items: IKanbanItem[];
}

export interface IKanbanBoard {
    initialPanels: IKanban[];
    onOrderChange: (panels: IKanban[]) => void;
    onPanelChange: (changedItemId: string, panel: string) => void;
}
