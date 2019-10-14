import React from "react";
import { backgroundColor, fontColor, hoverBackgroundColor } from "../../theme";
import { Button } from "../Buttons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigationWrapper = styled.div`
    background-color: ${backgroundColor.Primary};
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
        background: ${hoverBackgroundColor.Primary};
    }
`;

export const NavigationMenu: React.FC = () => {
    return (
        <NavigationWrapper>
            <Button
                Caption="Create Team"
                Emphasis="Secondary"
                Type="button"
                OnClick={() => window.location.pathname = "/create/team"}
            />
            <Button
                Caption="Create Project"
                Emphasis="Secondary"
                Type="button"
                OnClick={() => window.location.pathname = "/create/project"}
            />
            <Button
                Caption="Create Sprint"
                Emphasis="Secondary"
                Type="button"
                OnClick={() => window.location.pathname = "/create/sprint"}
            />
            <Button
                Caption="Create Ticket"
                Emphasis="Secondary"
                Type="button"
                OnClick={() => window.location.pathname = "/create/ticket"}
            />
            <NavigationLink to="/">Dashboard</NavigationLink>
            <NavigationLink to="/projects">Projects</NavigationLink>
            <NavigationLink to="/tickets">Tickets</NavigationLink>
        </NavigationWrapper>
    );
}
