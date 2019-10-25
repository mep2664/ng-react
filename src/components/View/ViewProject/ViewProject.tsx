import * as React from "react";
import { Loader, SelectInput } from "../../";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_PROJECT = gql`
    query ($projectName: String!) {
        project(projectName: $projectName) {
            projectId
            teamId
            projectName
            description
        }
        allTeams {
            teamId
            teamName
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($changes: ProjectInput!, $projectId: ID! ) {
        updateProject(changes: $changes, projectId: $projectId) {
            project {
                projectId
                teamId
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

const SelectInputs = styled.div`
    display: grid;
    grid-gap: 10px;
    align-items: center;
    justify-items: end;
    grid-template-columns: auto minmax(auto, 300px);
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

export interface IProject {
    projectName: string;
}

export const ViewProject: React.FC<IProject> = ({ projectName }) => {
    const [projectId, setProjectId] = React.useState<string>("");
    const [teamId, setTeamId] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { projectName }, fetchPolicy: "no-cache" });
    const [updateProject] = useMutation(UPDATE_PROJECT);

    React.useLayoutEffect(() => {
        if (data && data.project) {
            setProjectId(data.project.projectId);
            setTeamId(data.project.teamId || "");
            setDescription(data.project.description || "");
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateProject({ variables: { changes, projectId } });
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
            <React.Fragment>
                <span>{`Project: ${projectName}`}</span>
                <ProjectInfo>
                    <SelectInputs>
                        <SelectInput label="Team" name="team" options={teamOptions} value={teamId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("teamId", setTeamId, e.target.value)} />
                    </SelectInputs>
                    <DescriptionWrapper>
                        <label>Description</label>
                        <Description placeholder="Enter a ticket description here..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("description", setDescription, e.target.value)} />
                    </DescriptionWrapper>
                </ProjectInfo>
            </React.Fragment>
        </div >
    );
}