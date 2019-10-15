import React from "react";
import { emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../theme";
import styled from "styled-components";

interface IStyledButton {
    Emphasis: emphasisType;
}

const StyledButton = styled.button<IStyledButton>`
    background-color: ${(props) => backgroundColor[props.Emphasis]};
    border: none;
    border-radius: 3px;
    color: ${(props) => fontColor[props.Emphasis]};
    cursor: pointer;
    font-size: 15px;
    padding: 10px;
    vertical-align: center;

    &:hover {
        background-color: ${(props) => hoverBackgroundColor[props.Emphasis]};
    }
`;

interface IButtonProps {
    Caption: string;
    Type: "button" | "submit" | "reset";
    Emphasis: emphasisType;

    OnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

export const Button: React.FC<IButtonProps> = ({ Caption, Emphasis, Type, OnClick }) => {
    return (
        <StyledButton
            type={Type}
            Emphasis={Emphasis}
            onClick={OnClick}
        >
            {Caption}
        </StyledButton>
    );
}
