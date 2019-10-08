import * as React from "react";
import styled from "styled-components";

const Label = styled.label`

`;

const Input = styled.input`
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;
`;

interface ITextInput {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<ITextInput> = ({ label, name, onChange }) => {
    return (
        <React.Fragment>
            <Label>{label}</Label>
            <Input type="text" name={name} onChange={onChange} />
            {/* create an error tooltip for validation */}
        </React.Fragment>
    );
}