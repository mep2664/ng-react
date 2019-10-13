import * as React from "react";
import { Loader, SelectInput, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_TEAMS = gql`
    query {
        allTeams {
            teamId
            teamName
        }
    }
`;

const CREATE_PROJECT = gql`
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

const Description = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
    resize: none;
`;

export const CreateProject: React.FC = () => {
    const [projectName, setProject] = React.useState<string>("");
    const [teamId, setTeamId] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const { data, error, loading } = useQuery(GET_TEAMS);
    const [createProject] = useMutation(CREATE_PROJECT);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            projectName,
            description,
        }
        console.log(data);
        createProject({ variables: data });

    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error.message}</div>
    }

    const teamOptions = data.allTeams.map((team: any) => { return { caption: team.teamName, value: team.teamId } });

    return (
        <div>
            {`Create Project...`}
            <ProjectInfo>
                <form action="localhost:5556/project" method="post" onSubmit={handleSubmit}>
                    <TextInput name="projectName" label="Project Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)} />
                    <SelectInput name="teamId" label="Team" options={teamOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTeamId(e.target.value)} />
                    <DescriptionWrapper>
                        <label>Description</label>
                        <Description placeholder="Enter a project description here..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                    </DescriptionWrapper>
                    <input type="submit" value="submit" />
                </form>
            </ProjectInfo>
        </div>
    );
}