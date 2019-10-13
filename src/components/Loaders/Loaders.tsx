import * as React from "react";
import { Loader } from "./";
import styled from "styled-components";

const LoaderContainer = styled.div`
    position: relative;
    top: 100px;
`;

export const Loaders: React.FC = () => {
    return (
        <LoaderContainer title="Loader">
            <Loader />
        </LoaderContainer>
    );
}