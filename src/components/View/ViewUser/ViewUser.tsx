import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_USER = gql`
    query ($userId: ID!) {
        user(userId: $userId) {
            email
            firstName
            lastName
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($changes: UserInput!, $userId: ID! ) {
        updateUser(changes: $changes, userId: $userId) {
            user {
                email
                firstName
                lastName
            }
        }
    }
`;

const UserInfo = styled.div`
`;

export interface IUser {
    userId: string;
}

export const ViewUser: React.FC<IUser> = ({ userId }) => {
    const [email, setEmail] = React.useState<string>("");;
    const [password, setPassword] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_USER, { variables: { userId }, fetchPolicy: "no-cache" });
    const [updateUser] = useMutation(UPDATE_USER);

    React.useLayoutEffect(() => {
        if (data && data.user) {
            setEmail(data.user.email);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateUser({ variables: { changes, userId } });
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        if (error.networkError && "statusCode" in error.networkError
            && error.networkError["statusCode"] === 405) {
            window.location.assign(`${window.location.protocol}//${window.location.host}/`);
        }
        return <div>{error.message}</div>;
    }

    return (
        <div>
            <React.Fragment>
                <div>{`User: ${firstName} ${lastName}`}</div>
                <UserInfo>
                    <TextInput label="Email" name="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("email", setEmail, e.target.value)} />
                    <TextInput label="Password" name="password" placeholder="set new password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("password", setPassword, e.target.value)} />
                    <TextInput label="First Name" name="firstName" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("firstName", setFirstName, e.target.value)} />
                    <TextInput label="Last Name" name="lastName" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("lastName", setLastName, e.target.value)} />
                </UserInfo>
            </React.Fragment>
        </div >
    );
}