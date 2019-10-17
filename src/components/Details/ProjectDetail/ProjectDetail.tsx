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

interface IProject {
    projectId: string;
    projectName: string;
    teamId: string;
    description: string;
}

interface IProjectDetailProps {
    project: IProject;
}

export const ProjectDetail: React.FC<IProjectDetailProps> = ({ project }) => {
    return (
        <Detail>
            <ItemLink to={`/view/project/${project.projectName.toUpperCase()}`}>{`${project.projectName}`}</ItemLink>
            <div>{`Description: ${project.description}`}</div>
        </Detail>
    );
}