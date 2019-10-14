import * as React from "react";
import { TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REGISTER_USER = gql`
    mutation CreateUser($email:String!, $password:String!, $firstName:String!,$lastName:String!) {
        createUser(email:$email,password:$password,firstName:$firstName,lastName:$lastName) {
            token
            error
        }
    }
`;

interface IRegisterFormProps {
    formId: string;
    onSubmitChange: (isSubmitting: boolean) => void;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ formId, onSubmitChange }) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [error, setError] = React.useState<any>({});
    const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
    const [registerUser] = useMutation(REGISTER_USER);

    React.useEffect(() => {
        if (onSubmitChange) {
            onSubmitChange(isSubmitting);
        }
    }, [isSubmitting])

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
                    window.location.pathname = "/";
                } else if (response.data.createUser.errors) {
                    setError(response.data.createUser.errors);
                } else {
                    // TODO - never let this be a possibility
                    setError([{ message: "response didnt have token or error?" }]);
                }
                setSubmitting(false);
            }
        }).catch((error) => { setError(error); setSubmitting(false) });

    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <div>Register</div>
            {error && <div style={{ color: "red" }}>{error.message}</div>}
            <TextInput name="email" label="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <TextInput name="password" label="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <TextInput name="firstName" label="First Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
            <TextInput name="lastName" label="Last Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
        </form>
    );
}