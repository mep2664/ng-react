import * as React from "react";
import { Loader, SelectInput, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const CREATE_TEAM = gql`
    mutation CREATE_TEAM($teamName:String! $status:String, $dateCreated:DateTime) {
        createTeam(teamName:$teamName, status:$status, dateCreated:$dateCreated){
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
    { caption: "Pending", value: "Pending" },
    { caption: "Active", value: "Active" },
    { caption: "Terminated", value: "Terminated" },
];

export const CreateTeam: React.FC = () => {
    const [teamName, setTeamName] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const [createTeam] = useMutation(CREATE_TEAM);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dateCreated = new Date().toISOString()
        const data = {
            teamName,
            status,
            dateCreated,
        }
        console.log(data);
        createTeam({ variables: data });

    }

    return (
        <div>
            {`Create Team...`}
            <form action="localhost:5556/team" method="post" onSubmit={handleSubmit}>
                <TextInput label="Team Name" name="teamName" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)} />
                <SelectInputs>
                    { /* TODO - Multiple Select Input With Working State for UserTeam table */}
                    <SelectInput label="Status" name="status" options={statusOptions} value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)} />
                </SelectInputs>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}