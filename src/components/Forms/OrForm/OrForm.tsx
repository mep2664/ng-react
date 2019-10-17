import * as React from "react";
import { OrButton } from "../../";
import styled from "styled-components";

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 'main' 'footer';
    grid-gap: 15px;
    grid-template-rows: auto 60px;
    height: 350px;
    width: 400px;
    color: #1f1f1f;
    background-color: #fafafa;
    position: relative;
`;

const FormContainer = styled.div`
    grid-area: main;
`;

const ButtonContainer = styled.div`
    grid-area: footer;
`;

const SubmitOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.1);
    cursor: wait;
`;

export interface IOrFormProps {
    LeftFormID: string;
    RightFormID: string;
    LeftButtonCaption: string;
    RightButtonCaption: string;
    LeftForm: (props?: any) => JSX.Element;
    RightForm: (props?: any) => JSX.Element;
};

export interface IOrFormState {
    isLeftActive: boolean;
    LeftType: string;
    RightType: string;
};

export const OrForm: React.FC<IOrFormProps> = ({ LeftFormID, RightFormID, LeftButtonCaption, RightButtonCaption, LeftForm, RightForm }) => {
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
        <Wrapper>
            <FormContainer>
                {isLeftActive ? LeftForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting) })
                    : RightForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting) })}
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



