import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Detail = styled.div`
    min-height: 60px;
    background-color: #e5eaf4;
    border: 1px solid #04032e;
    color: #04032e;
    padding: 5px;
    box-sizing: border-box;
`;

const ItemLink = styled(Link)`
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    color: #0a085f;

    &:hover {
        text-decoration: underline;
    }
`

interface ITeam {
    teamId: string;
    teamName: string;
    status: string;
    teamMembers: { firstName: string, lastName: string }[];
}

interface ITeamDetailProps {
    team: ITeam;
}

export const TeamDetail: React.FC<ITeamDetailProps> = ({ team }) => {
    return (
        <Detail>
            <ItemLink to={`/view/team/${team.teamName}`}>{`${team.teamName}`}</ItemLink>
            <div>{`Status: ${team.status}`}</div>
            <div>{`Team Members: ${team.teamMembers.map((member) => `${member.firstName} ${member.lastName}`)}`.replace(",", ", ")}</div>
        </Detail>
    );
}