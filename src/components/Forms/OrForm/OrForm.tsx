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
    LeftFormID: string;
    RightFormID: string;
    LeftButtonCaption: string;
    RightButtonCaption: string;
    emphasis?: emphasisType;
    LeftForm: (props?: any) => JSX.Element;
    RightForm: (props?: any) => JSX.Element;
};

export interface IOrFormState {
    isLeftActive: boolean;
    LeftType: string;
    RightType: string;
};

export const OrForm: React.FC<IOrFormProps> = ({ LeftFormID, RightFormID, LeftButtonCaption, RightButtonCaption, LeftForm, RightForm, emphasis = "Primary" }) => {
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
                {isLeftActive ? LeftForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: emphasis })
                    : RightForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting), emphasis: emphasis })}
            </FormContainer>
            <ButtonContainer>
                <OrButton
                    LeftCaption={LeftButtonCaption}
                    RightCaption={RightButtonCaption}
                    LeftType={isLeftActive ? "submit" : "button"}
                    RightType={isLeftActive ? "button" : "submit"}
                    LeftForm={LeftFormID}
                    RightForm={RightFormID}
                    LeftOnClick={handleLeftOnClick}
                    RightOnClick={handleRightOnClick}
                />
            </ButtonContainer>
            {isSubmitting && <SubmitOverlay role="alert" aria-busy="true" aria-live="polite" />}
        </Wrapper>
    );
}



