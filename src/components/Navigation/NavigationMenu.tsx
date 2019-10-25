import React from "react";
import { AppState } from "../../store";
import { SystemState } from "../../store/System/types";
import { updateSession } from "../../store/System/actions";
import { connect } from "react-redux";
import { bgColor, fontColor, hoverBgColor } from "../../theme";
import { Button, Profile } from "../";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigationWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 25px;
`;

const NavigationLink = styled(Link)`
    color: ${fontColor.Primary}
    cursor: pointer;
    margin: 5px;    
    padding: 5px 10px;
    border-radius: 7.5px;
    font-size: 15px;
    line-height: 15px;

    &:hover {
        background: ${hoverBgColor.Primary};
    }
`;

const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    min-width: 60px;
    justify-content: space-between;
    cursor: pointer;
`;

const ProfileText = styled.span`
    font-size: 13px;
    margin-right: 5px;
`;

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

const mapDispatchToProps = {
    updateSession: updateSession,
}

interface INavigationMenu {
    system: SystemState;
    updateSession: typeof updateSession;
}

const NavigationMenuComponent: React.FC<INavigationMenu> = ({ system, updateSession }) => {
    const handleLogout = () => {
        document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        updateSession({ loggedIn: false, session: "", userName: "" });
    }

    return (
        <NavigationWrapper>
            <div>
                <Button
                    caption="Create Team"
                    emphasis="Primary"
                    type="button"
                    onClick={() => window.location.pathname = "/create/team"}
                />
                <Button
                    caption="Create Project"
                    emphasis="Secondary"
                    type="button"
                    onClick={() => window.location.pathname = "/create/project"}
                />
                <Button
                    caption="Create Sprint"
                    emphasis="Secondary"
                    type="button"
                    onClick={() => window.location.pathname = "/create/sprint"}
                />
                <Button
                    caption="Create Ticket"
                    emphasis="Secondary"
                    type="button"
                    onClick={() => window.location.pathname = "/create/ticket"}
                />
            </div>
            <ProfileWrapper role="button" onClick={handleLogout}>
                <ProfileText>Profile</ProfileText>
                <Profile width="10px" height="16.66px" fill={bgColor.Light as string} />
                <svg height="5" width="6">
                    <polygon points="0,0 3,5 6,0" fill={bgColor.Light as string} />
                </svg>
            </ProfileWrapper>
        </NavigationWrapper>
    );
}

export const NavigationMenu = connect(mapStateToProps, mapDispatchToProps)(NavigationMenuComponent);
