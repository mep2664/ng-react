import * as React from "react";
import { AppState } from "../../store";
import { SystemActionTypes, SystemState } from "../../store/System/types";
import { updateSession } from "../../store/System/actions";
import { connect } from "react-redux";
import styled from "styled-components";
import { bgColor, fontColor } from "../../theme";
import { Button, OrForm, LoginForm, Logo, RegisterForm } from "../../components";
import strings from "../../Localization";

const HomeWrapper = styled.div`
    background-color: ${bgColor.Dark};
    box-sizing: border-box;
`;

const DescriptionLogin = styled.section`
    display: flex;
    justify-content: space-evenly;
    padding: 100px 100px;
    color: ${fontColor.Light};
    background-image: linear-gradient(to bottom, ${bgColor.Dark}, ${bgColor.Darkgray});
`;

const Description = styled.div`
    max-width: 55%;
    padding: 50px 50px 50px 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const DescriptionBackImage = styled.div`
    position: absolute;
    opacity: 0.1;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DescriptionHeader = styled.h1`
    font-size: 36px;
    margin: 0;
    padding-bottom: 5px;
    text-align: center;
`;

const DescriptionSubHeader = styled.h2`
    font-size: 26px;
    margin: 0;
    padding: 5px 25px;
    border-top: 2px solid ${fontColor.Light}
    text-align: center;
`;

const DescriptionText = styled.span`
    padding: 0px 15px;
    box-sizing: border-box;
    text-align: center;
`;

const LearnMoreWrapper = styled.div`
    position: relative;
`;

const DetailWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 4px;
    background-color: ${bgColor.Dark};
`;

const Detail = styled.section`
    min-height: 400px;
    padding: 50px;
    box-sizing: border-box;
    background-color: ${bgColor.Light};
    border: 4px solid ${bgColor.Dark};
`;

const AnchorOffset = styled.div`
    margin-top: -50px;
    height: 50px;
`;

const DetailHeader = styled.h1`
    background-color: ${bgColor.Dark};
    background-image: linear-gradient(to bottom, ${bgColor.Darkgray}, ${bgColor.Dark});
    border-top: 2px solid ${bgColor.Lightgray};
    color: ${fontColor.Light};
    font-size: 36px;
    text-align: center;
    margin: 0;
    padding: 25px;

    &::before {
        content: "";
        display: block;
        height: 50px;
        margin-top: -50px;
        visibility: hidden;
    }
`;

const DetailSubHeader = styled.h2`
    margin-top: 0;
`;

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

const mapDispatchToProps = {
    updateSession: updateSession,
}

interface IHomeProps {
    system: SystemState;
}

const HomeComponent: React.FC<IHomeProps> = ({ system }) => {
    const loginFormId = "login_form";
    const registerFormId = "register_form"

    const leftForm = (props: any) => <LoginForm {...props} formId={loginFormId} />;
    const rightForm = (props: any) => <RegisterForm {...props} formId={registerFormId} />;

    return (
        <HomeWrapper>
            <DescriptionLogin>
                <Description>
                    <DescriptionBackImage>
                        <Logo height="100%" width="100%" fill={bgColor.Midgray as string} />
                    </DescriptionBackImage>
                    <HeaderContainer>
                        <DescriptionHeader>{strings.SystemName}</DescriptionHeader>
                        <DescriptionSubHeader>Project Management</DescriptionSubHeader>
                    </HeaderContainer>
                    <DescriptionText>
                        {strings.SystemName} is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </DescriptionText>
                    <LearnMoreWrapper>
                        <Button caption={strings.Action_LearnMore} type="button" emphasis="Primary" onClick={() => { window.location.hash = ""; window.location.hash = "#learnMore"; }} />
                    </LearnMoreWrapper>
                </Description>
                {
                    !system.loggedIn &&
                    < OrForm
                        leftFormID={loginFormId}
                        rightFormID={registerFormId}
                        leftForm={leftForm}
                        rightForm={rightForm}
                        leftButtonCaption="Login"
                        rightButtonCaption="Register"
                        bgEmphasis="Light"
                        fontEmphasis="Dark"
                    />
                }
            </DescriptionLogin>
            <div>
                <AnchorOffset id="learnMore"></AnchorOffset>
                <DetailHeader>What this tool will do for your team</DetailHeader>
                <DetailWrapper>
                    <Detail>
                        <DetailSubHeader>Planning</DetailSubHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                    <Detail>
                        <DetailSubHeader>Estimating</DetailSubHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                    <Detail>
                        <DetailSubHeader>Tracking</DetailSubHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                    <Detail>
                        <DetailSubHeader>Reporting</DetailSubHeader>
                        'SystemName' is a project management tool designed for agile development teams.
                        Create and deliver the perfect product quicker by keeping your team on the correct
                        track throughout the entire projects life cycle.
                    </Detail>
                </DetailWrapper>
            </div>
        </HomeWrapper>
    );
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
