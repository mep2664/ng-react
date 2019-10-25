import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_SPRINT_PROJECT = gql`
    query ($sprintProjectId: ID!) {
        sprintProject(sprintProjectId: $sprintProjectId) {
            sprintName
            projectName
            goal
        }
    }
`;

const UPDATE_SPRINT_PROJECT = gql`
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

export interface ISprint {
    sprintProjectId: string;
}

export const ViewSprint: React.FC<ISprint> = ({ sprintProjectId }) => {
    const [sprintName, setSprintName] = React.useState<string>("");;
    const [projectName, setProjectName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_SPRINT_PROJECT, { variables: { sprintProjectId }, fetchPolicy: "no-cache" });
    const [updateSprintProject] = useMutation(UPDATE_SPRINT_PROJECT);

    React.useLayoutEffect(() => {
        if (data && data.sprintProject) {
            setSprintName(data.sprintProject.sprintName);
            setProjectName(data.sprintProject.projectName);
            setGoal(data.sprintProject.goal);
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateSprintProject({ variables: { changes, sprintProjectId } });
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
                <div>{`Sprint: ${sprintName} - ${projectName}`}</div>
                <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("goal", setGoal, e.target.value)} />
            </React.Fragment>
        </div >
    );
}