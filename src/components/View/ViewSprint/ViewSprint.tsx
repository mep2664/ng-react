import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_SPRINT_PROJECT = gql`
    query ($sprintProjectId: ID!) {
        project(sprintProjectId: $sprintProjectId) {
            goal
        }
    }
`;

const UPDATE_SPRINT_PROJECT = gql`
    mutation updateSprintProject($changes: SprintProjectInput!, $sprintProjectId: ID! ) {
        updateProject(changes: $changes, sprintProjectId: $sprintProjectId) {
            sprintProject {
                sprintProjectId
                sprintId
                projectId
                goal
            }
        }
    }
`;

const SprintProjectInfo = styled.div`
    display: grid;
    grid-gap: 25px;
    align-items: center;
    justify-items: end;
    grid-template-columns: minmax(auto, 300px) auto;
    box-sizing: border-box;
    padding: 25px;
`;

export interface ISprint {
    sprintProjectId: string;
    sprintName: string;
    projectName: string;
}

export const ViewSprint: React.FC<ISprint> = ({ sprintProjectId, sprintName, projectName }) => {
    const [goal, setGoal] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_SPRINT_PROJECT, { variables: { sprintProjectId }, fetchPolicy: "no-cache" });
    const [updateSprintProject] = useMutation(UPDATE_SPRINT_PROJECT);

    React.useLayoutEffect(() => {
        if (data && data.sprintProject) {
            setGoal(data.project.goal);
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
        return <div>{error.message}</div>
    }

    return (
        <div>
            <React.Fragment>
                <span>{`Sprint: ${sprintName} - ${projectName}`}</span>
                <SprintProjectInfo>
                    <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("goal", setGoal, e.target.value)} />
                </SprintProjectInfo>
            </React.Fragment>
        </div >
    );
}