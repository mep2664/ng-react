import * as React from "react";
import { TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password:String!) {
        loginUser(email:$email, password:$password) {
            token
            error
        }
    }
`;

interface ILoginFormProps {
    formId: string;
    onSubmitChange?: (isSubmitting: boolean) => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ formId, onSubmitChange }) => {
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
        loginUser({
            variables: data,
            // TODO - figure out what to do with cache
            update: (cache, response) => {
                if (response.data.loginUser.token) {
                    setError(response.data.loginUser.error)
                    const d = new Date();
                    const numHours = 4;
                    const expires = d.setTime(d.getTime() + ((numHours * 60 * 60 * 1000)));
                    document.cookie = `uuid=${response.data.loginUser.token};expires=${expires};path=/`;
                    if (window.location.pathname === "/login") {
                        window.location.pathname = "/"
                    } else {
                        window.location.reload()
                    }
                } else if (response.data.loginUser.error) {
                    setError(response.data.loginUser.error);
                } else {
                    // TODO - never let this be a possibility
                    setError("response didnt have token or error?");
                }
                setSubmitting(false);
            }
        }).catch((error) => { setError(error); setSubmitting(false) });;
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <div>Login</div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <TextInput name="email" label="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <TextInput name="password" label="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </form >
    );
}