import * as React from "react";
import { TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { emphasisType } from "../../../theme";

export const REGISTER_USER = gql`
    mutation CreateUser($email:String!, $password:String!, $firstName:String!,$lastName:String!) {
        createUser(email:$email,password:$password,firstName:$firstName,lastName:$lastName) {
            token
            error
        }
    }
`;

const FormHeader = styled.h2`
    text-align: center;
`;


interface IRegisterFormProps {
    formId: string;
    emphasis: emphasisType;
    onSubmitChange?: (isSubmitting: boolean) => void;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ formId, emphasis = "Primary", onSubmitChange }) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
    const [registerUser] = useMutation(REGISTER_USER);

    React.useEffect(() => {
        if (onSubmitChange) {
            onSubmitChange(isSubmitting);
        }
    }, [isSubmitting, onSubmitChange])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const data = {
            email,
            password,
            firstName,
            lastName
        }
        registerUser({
            variables: data,
            // TODO - figure out what to do with cache
            update: (cache, response) => {
                if (response.data.createUser.token) {
                    setError(response.data.createUser.error)
                    const d = new Date();
                    const numHours = 4;
                    const expires = d.setTime(d.getTime() + ((numHours * 60 * 60 * 1000)));
                    // TODO - expires
                    document.cookie = `uuid=${response.data.createUser.token};expires=${expires};path=/`;
                    window.location.assign(window.location.href.replace("/login", "/"));
                } else {
                    if (response.data.createUser.error) {
                        setError(response.data.createUser.error);
                    } else {
                        setError("something went wrong...");
                    }
                }
                setSubmitting(false);
            }
        }).catch((reason) => { setError(reason.message); setSubmitting(false) });

    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <FormHeader>Register</FormHeader>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <TextInput name="email" label="Email" value={email} emphasis={emphasis} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <TextInput name="password" label="Password" value={password} emphasis={emphasis} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <TextInput name="firstName" label="First Name" value={firstName} emphasis={emphasis} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
            <TextInput name="lastName" label="Last Name" value={lastName} emphasis={emphasis} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
        </form>
    );
}