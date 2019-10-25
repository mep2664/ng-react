import * as React from "react";
import { Loader, SelectInput, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_TEAM = gql`
    query ($teamName: String!) {
        team(teamName: $teamName) {
            teamId
            teamName
            status
        }
    }
`;

const UPDATE_TEAM = gql`
    mutation updateTeam($changes: TeamInput!, $teamId: ID! ) {
        updateTeam(changes: $changes, teamId: $teamId) {
            team {
                teamId
                teamName
                status
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

export interface ITeam {
    team: string;
}

export const ViewTeam: React.FC<ITeam> = ({ team }) => {
    const [teamId, setTeamId] = React.useState<string>("");
    const [teamName, setTeamName] = React.useState<string>(team);
    const [status, setStatus] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_TEAM, { variables: { teamName: team }, fetchPolicy: "no-cache" });
    const [updateTeam] = useMutation(UPDATE_TEAM);

    React.useLayoutEffect(() => {
        if (data && data.team) {
            setTeamId(data.team.teamId);
            setTeamName(data.team.teamName);
            setStatus(data.team.status);
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateTeam({ variables: { changes, teamId } });
        window.history.replaceState({}, document.title, `/view/team/${teamName}`);
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

    const statusOptions = [
        { caption: "Pending", value: "Pending" },
        { caption: "Active", value: "Active" },
        { caption: "Terminated", value: "Terminated" },
    ];

    return (
        <div>
            <React.Fragment>
                <div>{`Team: ${teamName}`}</div>
                <TextInput label="Team Name" name="teamName" value={teamName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("teamName", setTeamName, e.target.value)} />
                <SelectInput label="Status" name="status" options={statusOptions} value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("status", setStatus, e.target.value)} />
            </React.Fragment>
        </div >
    );
}