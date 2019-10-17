import React from 'react';
import LogoIcon from "./LogoIcon";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface ILogoProps {
  height?: string;
  width?: string;
}

export const Logo: React.FC<ILogoProps> = ({ height, width }) => {
  return (
    <LogoWrapper>
      <LogoIcon height={height} width={width} />
    </LogoWrapper>
  );
}
