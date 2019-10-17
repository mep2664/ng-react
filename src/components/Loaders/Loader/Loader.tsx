import * as React from "react";
import styled, { keyframes } from "styled-components";
import { backgroundColor, emphasisType, IEmphasis } from "../../../theme";

const Container = styled.div`
    position: absolute;
    height: 75px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 25%;
    left: 50%;
    margin-top: -37.5px;
    margin-left: -175px;
`;

const AnimationKeyframe = keyframes`
    0% {left: 0; height: 100%; width: 15px; border-radius: 20px;}
    40% {height: 20%; width: 20%; border-radius: 50px;}
    100% {left: 100%; height: 100%; width: 15px; border-radius: 20px;}
`;

const Animation = styled.div<IEmphasis>`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 50%;
    left: 45%;
    transform: translate(-50%,-50%);

    &::before, &::after {
        content: "";
        display: block;
        width: 10%;
        height: 15px;
        background-color: ${({ emphasis }) => backgroundColor[emphasis]};
        position: absolute;
        animation: ${AnimationKeyframe} 1s infinite alternate ease-in-out;
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }
`;

const Caption = styled.span <IEmphasis>`
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 3px;
    font-family: verdana, sans-serif;
    color: ${({ emphasis }) => backgroundColor[emphasis]};
`;

interface ILoader {
    emphasis?: emphasisType;
}
export const Loader: React.FC<ILoader> = ({ emphasis = "Warning" }) => {
    return (
        <Container>
            <Caption emphasis={emphasis}>Loading...</Caption>
            <Animation emphasis={emphasis}></Animation>
        </Container>
    );
}