import * as React from "react";
import styled from "styled-components";

const Label = styled.label`

`;

const TextAreaInput = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
    resize: none;
`;

interface ITextInput {
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<ITextInput> = ({ label, name, onChange }) => {
    const labelFor = `textArea__${label}`;
    return (
        <React.Fragment>
            <Label htmlFor={labelFor}>{label}</Label>
            <TextAreaInput id={labelFor} name={name} onChange={onChange} />
            {/* create an error tooltip for validation */}
        </React.Fragment>
    );
}