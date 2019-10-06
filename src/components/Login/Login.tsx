import * as React from "react";
import { Link } from "react-router-dom";
import { LoginForm, RegisterForm } from "../../components";

export const Login: React.FC = () => {
    return (
        <React.Fragment>
            <LoginForm />
            <RegisterForm />
        </React.Fragment>
    );
}