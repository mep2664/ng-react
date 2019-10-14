import * as React from "react";
import { OrButton } from "../../";
import styled from "styled-components";
import { ButtonType } from "../../Buttons";

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
    LeftForm: (props?: any) => JSX.Element;
    RightForm: (props?: any) => JSX.Element;
    LeftFormProps?: any;
    RightFormProps?: any;
};

export interface IOrFormState {
    isLeftActive: boolean;
    LeftType: string;
    RightType: string;
};

export const OrForm: React.FC<IOrFormProps> = ({ LeftFormID, RightFormID, LeftForm, RightForm }) => {
    const [isLeftActive, setLeftActive] = React.useState<boolean>(true);
    const [leftType, setLeftType] = React.useState<ButtonType>("submit");
    const [rightType, setRightType] = React.useState<ButtonType>("button");
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

    const handleLeftOnClick = () => {
        if (isLeftActive) {
            setLeftType("submit");
        } else {
            setLeftActive(true);
            setRightType("button");
        }
    }

    const handleRightOnClick = () => {
        if (!isLeftActive) {
            setRightType("submit");
        } else {
            setLeftActive(false);
            setLeftType("button");
        }
    }

    return (
        <Wrapper>
            <FormContainer>
                {isLeftActive ? LeftForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting) })
                    : RightForm({ onSubmitChange: (isSubmitting: boolean) => setSubmitting(isSubmitting) })}
            </FormContainer>
            <ButtonContainer>
                <OrButton
                    LeftCaption={"Login"}
                    RightCaption={"Register"}
                    LeftType={leftType}
                    RightType={rightType}
                    LeftForm={LeftFormID}
                    RightForm={RightFormID}
                    LeftOnClick={handleLeftOnClick}
                    RightOnClick={handleRightOnClick}
                />
            </ButtonContainer>
            {isSubmitting && <SubmitOverlay />}
        </Wrapper>
    );
}



