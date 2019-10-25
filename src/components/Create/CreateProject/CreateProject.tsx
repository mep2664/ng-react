import * as React from "react";
import { Button, Loader, SelectInput, TextArea, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const GET_TEAMS = gql`
    query {
        allTeams {
            teamId
            teamName
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation createProject($projectName: String!, $teamId: ID, $description: String) {
            createProject(projectName: $projectName, teamId: $teamId, description: $description)
            {
                project {
                    projectId
                    projectName
                    description
                }
            }
    }
`;

const ProjectInfo = styled.div`
    display: grid;
    grid-gap: 25px;
    align-items: center;
    justify-items: end;
    grid-template-columns: minmax(auto, 300px) auto;
    box-sizing: border-box;
    padding: 25px;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const CreateProject: React.FC = () => {
    const [projectName, setProject] = React.useState<string>("");
    const [teamId, setTeamId] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const { data, error, loading } = useQuery(GET_TEAMS);
    const [createProject] = useMutation(CREATE_PROJECT);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const projectData = {
            projectName,
            description,
            teamId,
        }
        createProject({ variables: projectData });

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

    const teamOptions = data.allTeams.map((team: any) => { return { caption: team.teamName, value: team.teamId } });

    return (
        <div>
            {`Create Project...`}
            <ProjectInfo>
                <form action="localhost:5556/project" method="post" onSubmit={handleSubmit}>
                    <TextInput name="projectName" label="Project Name" value={projectName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)} />
                    <SelectInput name="teamId" label="Team" options={teamOptions} value={teamId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeamId(e.target.value)} />
                    <DescriptionWrapper>
                        <TextArea name="description" label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                    </DescriptionWrapper>
                    <Button caption="submit" type="submit" emphasis="Primary" />
                </form>
            </ProjectInfo>
        </div>
    );
}