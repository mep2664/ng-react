import * as React from "react";
import styled from "styled-components";
import { bgColor, fontColor } from "../../theme";
import { OrForm, LoginForm, RegisterForm } from "../../components";

const HomeWrapper = styled.div`
    background-color: ${bgColor.Dark};
    box-sizing: border-box;
`;

const DescriptionLogin = styled.section`
    display: flex;
    justify-content: space-evenly;
    padding: 50px 100px;
    color: ${fontColor.Light};
`;

const Description = styled.div`
    max-width: 55%;
    padding: 50px 50px 50px 0px;
    box-sizing: border-box;
`;

const DetailWrapper = styled.div`
`;

const DetailRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 2px solid ${bgColor.Light};

    &:first-child {
        border-top: 2px solid ${bgColor.Light};
    }

    &:nth-child(odd)>section:nth-child(odd) {
        background-color: ${bgColor.Dark};
        color: ${fontColor.Light};
    }

    &:nth-child(even)>section:nth-child(odd) {
        background-color: ${bgColor["Light"]};
        color: ${fontColor["Dark"]};
    }

    &:nth-child(odd)>section:nth-child(even) {
        background-color: ${bgColor["Light"]};
        color: ${fontColor["Dark"]};
    }

    &:nth-child(even)>section:nth-child(even) {
        background-color: ${bgColor["Dark"]};
        color: ${fontColor["Light"]};
    }
`;

const Detail = styled.section`
    min-height: 400px;
    padding: 50px;
    box-sizing: border-box;
`;

const DetailHeader = styled.h2`
`;

export const Home: React.FC = () => {
    const loginFormId = "login_form";
    const registerFormId = "register_form"

    const leftForm = (props: any) => <LoginForm {...props} formId={loginFormId} />;
    const rightForm = (props: any) => <RegisterForm {...props} formId={registerFormId} />;

    return (
        <HomeWrapper>
            <DescriptionLogin>
                <Description>
                    'SystemName' is a project management tool designed for agile development teams.
                    Create and deliver the perfect product quicker by keeping your team on the correct
                    track throughout the entire projects life cycle.
                </Description>
                <OrForm
                    leftFormID={loginFormId}
                    rightFormID={registerFormId}
                    leftForm={leftForm}
                    rightForm={rightForm}
                    leftButtonCaption="Login"
                    rightButtonCaption="Register"
                    bgEmphasis="Light"
                    fontEmphasis="Dark"
                />
            </DescriptionLogin>
            <DetailWrapper>
                <DetailRow>
                    <Detail>
                        <DetailHeader>Planning</DetailHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                    <Detail>
                        <DetailHeader>Estimating</DetailHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                </DetailRow>
                <DetailRow>
                    <Detail>
                        <DetailHeader>Tracking</DetailHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                    <Detail>
                        <DetailHeader>Reporting</DetailHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                </DetailRow>
            </DetailWrapper>
        </HomeWrapper>
    );
}
