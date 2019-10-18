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

interface ISprintProject {
    sprintProjectId: string;
    sprintName: string;
    projectName: string;
    goal: string;
}

interface ISprintProjectDetailProps {
    sprintProject: ISprintProject;
}

export const SprintProjectDetail: React.FC<ISprintProjectDetailProps> = ({ sprintProject }) => {
    return (
        <Detail>
            <ItemLink to={`/view/sprint_project/${sprintProject.sprintProjectId}`}>{`${sprintProject.sprintName} - ${sprintProject.projectName}`}</ItemLink>
            <div>{`Goal: ${sprintProject.goal}`}</div>
        </Detail>
    );
}