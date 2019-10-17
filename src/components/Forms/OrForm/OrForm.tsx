import * as React from "react";
import { OrButton } from "../../";
import { backgroundColor, borderColor, emphasisType, fontColor } from "../../../theme";
import styled from "styled-components";

interface Iemphasis {
    emphasis: emphasisType;
}

const Wrapper = styled.div<Iemphasis>`
    display: grid;
    grid-template-areas: 'main' 'footer';
    grid-gap: 15px;
    grid-template-rows: auto 60px;
    min-height: 350px;
    width: 400px;
    padding: 25px;
    color: ${({ emphasis }) => fontColor[emphasis]};
    background-color: ${({ emphasis }) => backgroundColor[emphasis]};
    border: 1px solid ${({ emphasis }) => borderColor[emphasis]};
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
    background-color: ${backgroundColor["Overlay"]};
    cursor: wait;
`;

export interface IOrFormProps {
    leftFormID: string;
    rightFormID: string;
    leftButtonCaption: string;
    rightButtonCaption: string;
    emphasis?: emphasisType;
    leftForm: (props?: any) => JSX.Element;
    rightForm: (props?: any) => JSX.Element;
};

export const OrForm: React.FC<IOrFormProps> = ({ leftFormID, rightFormID, leftButtonCaption, rightButtonCaption, leftForm, rightForm, emphasis = "Primary" }) => {
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
        <Wrapper emphasis={emphasis}>
            <FormContainer>
                {isLeftActive ? leftForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: emphasis })
                    : rightForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: emphasis })}
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



