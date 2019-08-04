import React from 'react';
import LogoIcon from "./LogoIcon";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo: React.FC = () => {
  return (
    <LogoWrapper>
        <LogoIcon />Logo
    </LogoWrapper>
  );
}
export default Logo;
