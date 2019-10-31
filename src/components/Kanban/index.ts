export * from "./KanbanBoard";
export * from "./KanbanItem";
export * from "./KanbanPanel";

export interface IKanbanItem {
    Title: string;
    ID: number;
    Type: string;
    Description: string;
    IndicatorColor?: string;
}

export interface IKanbanPanel {
    Title: string;
    ID: number;
    Type: string;
    Items: IKanbanItem[];
}

export interface IKanbanBoard {
    Panels: IKanbanPanel[];
}
