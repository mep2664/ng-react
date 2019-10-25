import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loader, ProjectDetail, SprintProjectDetail, TeamDetail, TicketDetail, UserDetail } from "../";
import styled from "styled-components";

export const GET_DATA = gql`
    {
        allUsers {
            userId
            email
            firstName
            lastName
        }
        allTeams {
            teamId
            teamName
            status
            teamMembers {
                firstName
                lastName
            }
        }
        allProjects {
            projectName
            description
        }
        allSprintProjects {
            sprintProjectId
            sprintName
            projectName
            goal
        }
        allTickets {
            projectName
            ticketNumber
            ticketId
            description
            sprintName
            priority
            ticketType
            storyPoints
        }
    }
`;

const Wrapper = styled.div`
    padding: 15px;
    display: grid;
    grid-gap: 15px;
`;

const Users = styled.div``;

const Teams = styled.div``;

const Projects = styled.div``;

const Sprints = styled.div``;

const Tickets = styled.div``;

export const Dashboard: React.FC = () => {
    const { loading, error, data } = useQuery(GET_DATA, { fetchPolicy: "no-cache" });
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

    return (
        <Wrapper>
            <Users>
                Users
                {(data.allUsers as any[]).map((user: any, index) => // TODO give ticket a type
                    <UserDetail key={index} user={user} />
                )}
            </Users>
            <Teams>
                Teams
                {(data.allTeams as any[]).map((team: any, index) => // TODO give ticket a type
                    <TeamDetail key={index} team={team} />
                )}
            </Teams>
            <Projects>
                Projects
                {(data.allProjects as any[]).map((project: any, index) => // TODO give ticket a type
                    <ProjectDetail key={index} project={project} />
                )}
            </Projects>
            <Sprints>
                Sprints
                {(data.allSprintProjects as any[]).map((sprintProject: any, index) => // TODO give ticket a type
                    <SprintProjectDetail key={index} sprintProject={sprintProject} />
                )}
            </Sprints>
            <Tickets>
                Tickets
                {(data.allTickets as any[]).map((ticket: any, index) => // TODO give ticket a type
                    <TicketDetail key={index} ticket={ticket} />
                )}
            </Tickets>
        </Wrapper>
    );
}