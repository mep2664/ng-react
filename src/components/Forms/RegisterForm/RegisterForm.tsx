import * as React from "react";
import { TextInput } from "../..";
import styled from "styled-components";
import { emphasisType } from "../../../theme";

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
        fetch("http://localhost:5556/rest/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                response.json().then((session) => {
                    const d = new Date();
                    const numHours = 4;
                    const expires = d.setTime(d.getTime() + ((numHours * 60 * 60 * 1000)));
                    // TODO - expires
                    document.cookie = `uuid=${session.sessionID};expires=${expires};path=/`;
                    window.location.assign(`${window.location.protocol}//${window.location.host}/dashboard`);
                }, (reason) => { setError(reason.toString()); setSubmitting(false); });
            } else {
                response.json().then((reason) => {
                    setError(reason.error);
                    setSubmitting(false);
                }, (reason) => { setError(reason.toString()); setSubmitting(false); });
            }
        }, (reason) => { setError(reason.toString()); setSubmitting(false); });
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