import React from "react";
import { bgColor, fontColor, hoverBgColor } from "../../theme";
import { Button } from "../Buttons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigationWrapper = styled.div`
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

export const NavigationMenu: React.FC = () => {
    return (
        <NavigationWrapper>
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
            <NavigationLink to="/">Dashboard</NavigationLink>
            <NavigationLink to="/projects">Projects</NavigationLink>
            <NavigationLink to="/tickets">Tickets</NavigationLink>
        </NavigationWrapper>
    );
}
