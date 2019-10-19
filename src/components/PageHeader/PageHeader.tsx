import React from 'react';
import { bgColor, fontColor } from "../../theme";
import { Logo, NavigationMenu } from "../../components";
import styled from "styled-components";

const Spaceholder = styled.div`
    height: 50px;
`;

const Header = styled.header`
    background-color: ${bgColor.Primary};
    color: ${fontColor.Primary};
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const PageHeader: React.FC = () => {
  return (
    <Spaceholder>
      <Header>
        <Logo />
        <NavigationMenu />
      </Header>
    </Spaceholder>
  );
}