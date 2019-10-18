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
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface IProjectDetailProps {
    user: IProject;
}

export const UserDetail: React.FC<IProjectDetailProps> = ({ user }) => {
    return (
        <Detail>
            <ItemLink to={`/view/user/${user.userId}`}>{`${user.firstName} ${user.lastName}`}</ItemLink>
            <div>{`Email: ${user.email}`}</div>
        </Detail>
    );
}