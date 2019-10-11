import * as React from "react";
import { SelectInput, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_OPTIONS = gql`
query {
    allProjects {
        projectId
        projectName
    }
    allUsers {
        userId
        firstName
        lastName
    }
}
`;

const CREATE_TEAM = gql`
    mutation CREATE_TEAM($teamName:String!, $members:[UserType], $projects:[ProjectType], $status:String, $dateCreated:DateTime) {
        createTeam(teamName:$teamName, members:$members, projects:$projects, status:$status, dateCreated:$dateCreated){
            team {
                teamId
                teamName
                status
                dateCreated
            }
        }
    }
`;

const SelectInputs = styled.div`
    display: grid;
    grid-gap: 10px;
    align-items: center;
    justify-items: end;
    grid-template-columns: auto minmax(auto, 300px);
`;

const statusOptions = [
    { caption: "Pending", value: 1 },
    { caption: "Active", value: 1 },
    { caption: "Terminated", value: 2 },
];

export const CreateTeam: React.FC = () => {
    const [teamName, setTeamName] = React.useState<string>("");
    const [members, setMembers] = React.useState<string[]>([]);
    const [projects, setProjects] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_OPTIONS);
    const [createTeam] = useMutation(CREATE_TEAM);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dateCreated = new Date().toISOString()
        const members_obj = members.map((member) => { return { userId: member } });
        const projects_obj = members.map((project) => { return { projectId: project } });
        const data = {
            teamName,
            members: members_obj,
            projects: projects_obj,
            status,
            dateCreated,
        }
        console.log(data);
        createTeam({ variables: data });

    }

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    const projectOptions = data.allProjects.map((project: any) => { return { caption: project.projectName, value: project.projectId } });
    const userOptions = data.allUsers.map((user: any) => { return { caption: `${user.firstName} ${user.lastName}`, value: user.userId } });

    console.log(members);

    return (
        <div>
            {`Create Team...`}
            <form action="localhost:5556/team" method="post" onSubmit={handleSubmit}>
                <TextInput label="Team Name" name="teamName" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)} />
                <SelectInputs>
                    { /* TODO - Multiple Select Input With Working State */}
                    <SelectInput isMultiple={true} label="Team Members" name="members" options={userOptions} value={members}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMembers(members.includes(e.target.value) ? members.splice(members.indexOf(e.target.value), 1) : members.concat(e.target.value))} />
                    <SelectInput label="Projects" name="projects" options={projectOptions} value={projects} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjects(e.target.value)} />
                    <SelectInput label="Status" name="status" options={statusOptions} value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)} />
                </SelectInputs>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}