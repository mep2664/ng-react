import * as React from "react";
import styled from "styled-components";
import { borderColor, emphasisType } from "../../../theme";

const Label = styled.label`

`;

interface IEmphasis {
    emphasis: emphasisType
}

const Input = styled.input<IEmphasis>`
    width: 100%;
    border: 1px solid ${({ emphasis }) => borderColor[emphasis]};
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;
`;

interface ITextInput {
    label: string;
    name: string;
    placeholder?: string;
    value: string;
    emphasis?: emphasisType;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<ITextInput> = ({ label, name, placeholder, value, emphasis = "Secondary", onBlur, onChange }) => {
    const labelFor = `textInput__${label}`;
    return (
        <div>
            <Label htmlFor={labelFor}>{label}</Label>
            <Input id={labelFor} type="text" name={name} placeholder={placeholder} value={value} emphasis={emphasis} onBlur={onBlur} onChange={onChange} />
            {/* create an error tooltip for validation */}
        </div>
    );
}