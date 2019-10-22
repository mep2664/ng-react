export const fontFamily = 'Arial, "Arial Header", sans-serif';

export interface IEmphasis {
    emphasis: emphasisType;
}

interface IEmphasisTypes {
    Primary: string;
    Secondary: string;
    Dark: string;
    Light: string;
    Positive?: string;
    Neutral?: string;
    Warning?: string;
    Error?: string;
    Overlay?: string;
    Header?: string;
}

export type emphasisType = "Primary" | "Secondary" | "Dark" | "Light" |
    "Positive" | "Neutral" | "Warning" | "Error" | "Overlay" | "Header";

export const bgColor: IEmphasisTypes = {
    Primary: "#2185d0",
    Secondary: "#e0e1e2",
    Dark: "rgb(25, 25, 25)",
    Light: "#f0f0f0",
    Positive: "#21ba45",
    Warning: "orange",
    Error: "#d8000c",
    Overlay: "rgba(0,0,0,0.1)",
    Header: "rgb(40, 40, 40, 0.96)",
}

export const borderColor: IEmphasisTypes = {
    Primary: "#ffffff",
    Secondary: "#000000",
    Dark: "#0f0f0f",
    Light: "#f0f0f0",
}

export const buttonBgColor: IEmphasisTypes = {
    Primary: "#2185d0",
    Secondary: "#e0e1e2",
    Dark: "#1b1c1d",
    Light: "#f0f0f0",
    Positive: "#21ba45",
    Warning: "orange",
    Error: "#d8000c",
}

export const fontColor: IEmphasisTypes = {
    Primary: "#f0f0f0",
    Secondary: "#1f1f1f",
    Dark: "#1f1f1f",
    Light: "#f0f0f0",
    Positive: "#f0f0f0",
}

export const hoverBgColor: IEmphasisTypes = {
    Primary: "#1a49d6",
    Secondary: "#a9a9a9",
    Dark: "#000000",
    Light: "#ffffff",
}

export const hoverFontColor: IEmphasisTypes = {
    Primary: "#1a49d6",
    Secondary: "#a9a9a9",
    Dark: "#000000",
    Light: "#ffffff",
}
