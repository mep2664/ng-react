import * as React from "react";
import { CircleLoader, Loader } from "./";
import styled from "styled-components";

const Wrapper = styled.div`
`;

const LoaderContainer = styled.div`
    position: relative;
    top: 25px;
    height: 100px;
`;

const CenterLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
`;

export const Loaders: React.FC = () => {
    return (
        <Wrapper>
            <LoaderContainer title="Loader">
                <Loader />
            </LoaderContainer>
            <CenterLoader title="CircleLoader">
                <CircleLoader />
            </CenterLoader>
        </Wrapper>
    );
}