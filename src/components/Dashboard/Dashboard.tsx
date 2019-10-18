import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loader, ProjectDetail, SprintProjectDetail, TicketDetail } from "../";
import styled from "styled-components";

export const GET_DATA = gql`
    {
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

const Projects = styled.div``;

const Sprints = styled.div``;

const Tickets = styled.div``;

export const Dashboard: React.FC = () => {
    const { loading, error, data } = useQuery(GET_DATA, { fetchPolicy: "no-cache" });
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <Wrapper>
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