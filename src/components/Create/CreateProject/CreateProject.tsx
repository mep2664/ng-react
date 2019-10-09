import * as React from "react";
import { TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_PROJECT = gql`
    mutation createProject($projectName: String!, $description: String) {
            createProject(projectName: $projectName, description: $description)
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
    const [description, setDescription] = React.useState<string>("");
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

    return (
        <div>
            {`Create Project...`}
            <ProjectInfo>
                <form action="localhost:5556/project" method="post" onSubmit={handleSubmit}>
                    <TextInput name="projectName" label="Project Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)} />
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