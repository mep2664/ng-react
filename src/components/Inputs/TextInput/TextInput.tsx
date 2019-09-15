import * as React from "react";
import styled from "styled-components";

interface IWrapper {
    align: "vertical" | "horizontal";
}
const Wrapper = styled.div<IWrapper>`
    display: grid;
    ${props => props.align === "horizontal" ? "grid-template-columns: repeat(3, 1fr);" : "grid-template-rows: repeat(3, 1fr);"}
    padding: 5px;
`;

const Label = styled.label`

`;

const Input = styled.input`

`;

interface ITextInput {
    align: "vertical" | "horizontal";
    label: string;
    name: string;
}

export const TextInput: React.FC<ITextInput> = ({ align, label, name }) => {
    return (
        <Wrapper align={align}>
            <Label>{label}</Label>
            <Input type="text" name={name} />
        </Wrapper>
    );
}