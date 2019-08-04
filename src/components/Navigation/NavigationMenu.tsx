import React from "react";
import { backgroundColor, fontColor, hoverBackgroundColor } from "../../colors";
import { Button } from "../Button";
import styled from "styled-components";

const NavigationWrapper = styled.div`
    background-color: ${backgroundColor.Primary};
`;

const NavigationLink = styled.a`
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
            Caption="Matt's Button"
            Emphasis="Secondary"
            Type="button"
            OnClick={() => alert("Click")}
        />
        <NavigationLink>Home</NavigationLink>
        <NavigationLink>About</NavigationLink>
        <NavigationLink>Contact</NavigationLink>
    </NavigationWrapper>
  );
}
