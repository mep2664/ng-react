import * as React from "react";
import styled from "styled-components"
import { ButtonType } from "../";

const ButtonWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const OrSpan = styled.span`
    position: absolute;
    left: 50%;
    margin-top: 7.5px;
    margin-left: -12.5px;
    line-height: 25px;
    height: 25px;
    width: 25px;
    text-align: center;
    color: #1f1f1f;
    background: #f0f0f0;
    border-radius: 20px;
`;

const SharedButtonStyle = `
    height: 40px;
    width: 150px;
    padding: 0 20px;
    color: #1f1f1f;
    border-radius: 5px;
    font-family: Arial, "Arial Header", sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`

const LeftButton = styled.button`
    ${SharedButtonStyle}
    margin-right: 1px;
    border-radius: 20px 0 0 20px;
`;

const RightButton = styled.button`
    ${SharedButtonStyle}
    margin-left: 1px;
    border-radius: 0 20px 20px 0;
`;

export interface IOrButtonProps {
    LeftCaption: string;
    RightCaption: string;
    LeftType?: ButtonType;
    RightType?: ButtonType;
    LeftForm?: string;
    RightForm?: string;

    LeftOnClick: () => void;
    RightOnClick: () => void;
};

export const OrButton: React.FC<IOrButtonProps> = ({ LeftCaption, RightCaption, LeftType, RightType, LeftForm, RightForm, LeftOnClick, RightOnClick }) => {
    return (
        <ButtonWrapper>
            <LeftButton
                type={LeftType || "button"}
                form={LeftForm}
                onClick={LeftOnClick}
            >
                {LeftCaption}
            </LeftButton>
            <OrSpan>or</OrSpan>
            <RightButton
                type={RightType || "button"}
                form={RightForm}
                onClick={RightOnClick}
            >
                {RightCaption}
            </RightButton>
        </ButtonWrapper>
    );
}
