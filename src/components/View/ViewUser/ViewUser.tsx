import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_USER = gql`
    query ($sprintProjectId: ID!) {
        sprintProject(sprintProjectId: $sprintProjectId) {
            sprintName
            projectName
            goal
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateSprintProject($changes: SprintProjectInput!, $sprintProjectId: ID! ) {
        updateSprintProject(changes: $changes, sprintProjectId: $sprintProjectId) {
            sprintProject {
                sprintProjectId
                sprintId
                projectId
                goal
            }
        }
    }
`;

const UserInfo = styled.div`
    display: grid;
    grid-gap: 25px;
    align-items: center;
    justify-items: end;
    grid-template-columns: minmax(auto, 300px) auto;
    box-sizing: border-box;
    padding: 25px;
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
    const [updateSprintProject] = useMutation(UPDATE_USER);

    React.useLayoutEffect(() => {
        if (data && data.user) {
            setEmail(data.user.email);
            setPassword(data.user.password);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateSprintProject({ variables: { changes, userId } });
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div>
            <React.Fragment>
                <span>{`User: ${firstName} ${lastName}`}</span>
                <UserInfo>
                    <TextInput label="Email" name="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("email", setEmail, e.target.value)} />
                    <TextInput label="Password" name="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("password", setPassword, e.target.value)} />
                    <TextInput label="First Name" name="firstName" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("firstname", setFirstName, e.target.value)} />
                    <TextInput label="Last Name" name="lastName" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("lastName", setLastName, e.target.value)} />
                </UserInfo>
            </React.Fragment>
        </div >
    );
}