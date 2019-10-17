import React from "react";
import { IEmphasis, emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../theme";
import styled from "styled-components";

const StyledButton = styled.button<IEmphasis>`
    background-color: ${(props) => backgroundColor[props.emphasis]};
    border: none;
    border-radius: 3px;
    color: ${(props) => fontColor[props.emphasis]};
    cursor: pointer;
    font-size: 15px;
    padding: 10px;
    vertical-align: center;

    &:hover {
        background-color: ${(props) => hoverBackgroundColor[props.emphasis]};
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
