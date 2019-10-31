import React from 'react';
import { AppState } from "../../store";
import { SystemState } from "../../store/System/types";
import { connect } from "react-redux";
import { bgColor, fontColor } from "../../theme";
import { Logo, NavigationMenu } from "../../components";
import styled from "styled-components";
import strings from "../../Localization";

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
    padding: 0 30px 0 15px;
    box-sizing: border-box;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const SystemName = styled.span`
  font-size: 22px;
  padding: 0 10px;
`;

const mapStateToProps = (state: AppState) => ({
  system: state.system,
});

interface IPageHeaderProps {
  system: SystemState;
}

const PageHeaderComponent: React.FC<IPageHeaderProps> = ({ system }) => {
  return (
    <Header>
      <LogoWrapper onClick={() => window.location.assign(`${window.location.protocol}//${window.location.host}/home`)} role="button">
        <Logo height="30px" width="30px" fill={bgColor.Light} />
        <SystemName>{strings.SystemName}</SystemName>
      </LogoWrapper>
      {system.loggedIn && <NavigationMenu />}
    </Header>
  );
}

export const PageHeader = connect(mapStateToProps)(PageHeaderComponent);