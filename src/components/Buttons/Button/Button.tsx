import React from "react";
import { IEmphasis, emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../theme";
import styled from "styled-components";

const StyledButton = styled.button<IEmphasis>`
    background-color: ${({ emphasis }) => backgroundColor[emphasis]};
    border: none;
    border-radius: 3px;
    color: ${({ emphasis }) => fontColor[emphasis]};
    cursor: pointer;
    font-size: 15px;
    padding: 10px;
    vertical-align: center;

    &:hover {
        background-color: ${({ emphasis }) => hoverBackgroundColor[emphasis]};
    }
`;

interface IButtonProps {
    caption: string;
    type: "button" | "submit" | "reset";
    emphasis: emphasisType;

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

export const Button: React.FC<IButtonProps> = ({ caption, emphasis, type, onClick }) => {
    return (
        <StyledButton
            type={type}
            emphasis={emphasis}
            onClick={onClick}
        >
            {caption}
        </StyledButton>
    );
}
