import * as React from "react";
import { OrButton } from "../../";
import { bgColor, borderColor, emphasisType, fontColor } from "../../../theme";
import styled from "styled-components";

interface IEmphasis {
    bgEmphasis: emphasisType;
    fontEmphasis: emphasisType;
}

const Wrapper = styled.div<IEmphasis>`
    display: grid;
    grid-template-areas: 'main' 'footer';
    grid-gap: 15px;
    grid-template-rows: auto 60px;
    min-height: 350px;
    width: 400px;
    padding: 25px;
    color: ${({ fontEmphasis }) => fontColor[fontEmphasis]};
    background-color: ${({ bgEmphasis }) => bgColor[bgEmphasis]};
    border: 1px solid ${({ bgEmphasis }) => borderColor[bgEmphasis]};
    border-radius: 5px;
    position: relative;
`;

const FormContainer = styled.div`
    grid-area: main;
`;

const ButtonContainer = styled.div`
    grid-area: footer;
    display: flex;
    align-items: flex-end;
`;

const SubmitOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${bgColor["Overlay"]};
    cursor: wait;
`;

export interface IOrFormProps {
    leftFormID: string;
    rightFormID: string;
    leftButtonCaption: string;
    rightButtonCaption: string;
    bgEmphasis?: emphasisType;
    fontEmphasis?: emphasisType;
    leftForm: (props?: any) => JSX.Element;
    rightForm: (props?: any) => JSX.Element;
};

export const OrForm: React.FC<IOrFormProps> = ({ leftFormID, rightFormID, leftButtonCaption, rightButtonCaption, leftForm, rightForm, bgEmphasis = "Primary", fontEmphasis = "Secondary" }) => {
    const [isLeftActive, setLeftActive] = React.useState<boolean>(true);
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

    const handleLeftOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isLeftActive) {
            e.preventDefault();
        }
        setLeftActive(true);
    }

    const handleRightOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLeftActive) {
            e.preventDefault();
        }
        setLeftActive(false);
    }

    return (
        <Wrapper bgEmphasis={bgEmphasis} fontEmphasis={fontEmphasis}>
            <FormContainer>
                {isLeftActive ? leftForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: bgEmphasis })
                    : rightForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: bgEmphasis })}
            </FormContainer>
            <ButtonContainer>
                <OrButton
                    leftCaption={leftButtonCaption}
                    rightCaption={rightButtonCaption}
                    leftType={isLeftActive ? "submit" : "button"}
                    rightType={isLeftActive ? "button" : "submit"}
                    leftForm={leftFormID}
                    rightForm={rightFormID}
                    leftOnClick={handleLeftOnClick}
                    rightOnClick={handleRightOnClick}
                />
            </ButtonContainer>
            {isSubmitting && <SubmitOverlay role="alert" aria-busy="true" aria-live="polite" />}
        </Wrapper>
    );
}



