interface IEmphasis {
    Primary: string;
    Secondary: string;
}
export type emphasisType = "Primary" | "Secondary";

export const backgroundColor: IEmphasis = {
    Primary: "#1a49d6",
    Secondary: "#dadee8",
}

export const borderColor: IEmphasis = {
    Primary: "#fff",
    Secondary: "#000",
}

export const fontColor: IEmphasis = {
    Primary: "#fff",
    Secondary: "#000",
}

export const hoverBackgroundColor: IEmphasis = {
    Primary: "darkblue",
    Secondary: "darkgrey",
}
