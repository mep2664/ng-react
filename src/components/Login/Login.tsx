import * as React from "react";
import { OrForm, LoginForm, Logo, RegisterForm } from "../../components";

export const Login: React.FC = () => {
    const loginFormId = "login_form";
    const registerFormId = "register_form"

    const leftForm = (props: any) => <LoginForm {...props} formId={loginFormId} />;
    const rightForm = (props: any) => <RegisterForm {...props} formId={registerFormId} />;

    return (
        <React.Fragment>
            <OrForm
                LeftFormID={loginFormId}
                RightFormID={registerFormId}
                LeftForm={leftForm}
                RightForm={rightForm}
                LeftButtonCaption="Login"
                RightButtonCaption="Register"
                emphasis="Primary"
            />
        </React.Fragment>
    );
}