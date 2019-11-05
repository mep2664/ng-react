import * as React from "react";
import { TextInput } from "../..";
import styled from "styled-components";
import { emphasisType } from "../../../theme";

const Form = styled.form`
    display: grid;
    grid-gap: 15px;
`;

const FormHeader = styled.h2`
    text-align: center;
`;

interface ILoginFormProps {
    formId: string;
    emphasis: emphasisType;
    onSubmitChange?: (isSubmitting: boolean) => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ formId, emphasis = "Primary", onSubmitChange }) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
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
        }
        fetch("http://localhost:5556/rest/login", {
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
                    document.cookie = `uuid=${session.sessionID};expires=${expires};path=/`;
                    if (window.location.pathname === "/login" || window.location.pathname === "/home" || window.location.pathname === "/") {
                        window.location.assign(`${window.location.protocol}//${window.location.host}/dashboard`);
                    } else {
                        window.location.reload()
                    }

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
        <Form id={formId} onSubmit={handleSubmit}>
            <FormHeader>Login</FormHeader>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <TextInput emphasis={emphasis} name="email" label="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <TextInput emphasis={emphasis} name="password" label="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </Form >
    );
}