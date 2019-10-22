import React from 'react';
import { bgColor, fontColor } from "../../theme";
import { Logo, NavigationMenu } from "../../components";
import styled from "styled-components";

//${bgColor.Primary};
const Header = styled.header`
    background-color: ${bgColor.Header};
    color: ${fontColor.Primary};
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
`;

export const PageHeader: React.FC = () => {
  return (
    <Header>
      <Logo />
      <NavigationMenu />
    </Header>
  );
}