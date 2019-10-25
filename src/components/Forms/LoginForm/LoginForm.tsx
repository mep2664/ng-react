import * as React from "react";
import { TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { emphasisType } from "../../../theme";

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password:String!) {
        loginUser(email:$email, password:$password) {
            token
            error
        }
    }
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
    const [loginUser] = useMutation(LOGIN_USER);

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
            response.json().then((session) => {
                console.log(session);
                const d = new Date();
                const numHours = 4;
                const expires = d.setTime(d.getTime() + ((numHours * 60 * 60 * 1000)));
                document.cookie = `uuid=${session.sessionID};expires=${expires};path=/`;
                if (window.location.pathname === "/login" || window.location.pathname === "/home" || window.location.pathname === "/") {
                    console.log("here");
                    console.log(window.location.host + "/dashboard");
                    window.location.assign(`${window.location.protocol}//${window.location.host}/dashboard`);
                } else {
                    window.location.reload()
                }

            }, (reason) => { setError(reason.toString()); setSubmitting(false); });
        }, (reason) => { setError(reason.toString()); setSubmitting(false); });
        // loginUser({
        //     variables: data,
        //     // TODO - figure out what to do with cache
        //     update: (cache, response) => {
        //         if (response.data.loginUser.token) {
        //             setError(response.data.loginUser.error)
        //             const d = new Date();
        //             const numHours = 4;
        //             const expires = d.setTime(d.getTime() + ((numHours * 60 * 60 * 1000)));
        //             document.cookie = `uuid=${response.data.loginUser.token};expires=${expires};path=/`;
        //             if (window.location.pathname === "/login" || window.location.pathname === "/home" || window.location.pathname === "/") {
        //                 console.log("here");
        //                 console.log(window.location.host + "/dashboard");
        //                 window.location.assign(`${window.location.protocol}//${window.location.host}/dashboard`);
        //             } else {
        //                 window.location.reload()
        //             }
        //         } else {
        //             if (response.data.loginUser.error) {
        //                 setError(response.data.loginUser.error);
        //             } else {
        //                 setError("something went wrong...");
        //             }
        //         }
        //         setSubmitting(false);
        //     }
        // }).catch((error) => { setError(error.message); setSubmitting(false) });
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <FormHeader>Login</FormHeader>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <TextInput emphasis={emphasis} name="email" label="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <TextInput emphasis={emphasis} name="password" label="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </form >
    );
}