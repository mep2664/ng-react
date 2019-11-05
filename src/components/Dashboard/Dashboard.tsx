import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loader, InfiniteScroll, ProjectDetail, SprintProjectDetail, TeamDetail, TicketDetail, UserDetail } from "../";
import styled from "styled-components";

const TICKET_PAGINATION_QUERY = `
query ($first: Int, $after: String, $before: String) {
    tickets(first: $first, after: $after, before: $before) {
      edges {
        node {
          ticketId
          ticketNumber
          projectName
          description
          sprintName
          activeUserId
          priority
          ticketType
          statusId
          storyPoints
          title
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

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
    }
`;

const ThreeColumns = styled.div`
    padding: 30px 4.875%;
    display: grid;
    grid-gap: 2.5%;
    grid-template-columns: 31% 31% 31%;
`;

const TwoColumns = styled.div`
    padding: 30px 4.875%;
    display: grid;
    grid-gap: 2.5%;
    grid-template-columns: 47.75% 47.75%;
`;

const Users = styled.div``;

const Teams = styled.div``;

const Projects = styled.div``;

const Sprints = styled.div``;

const Tickets = styled.div`
    height: 500px;
`;

const renderTickets = (nodes: any) => {
    return nodes.map(({ node }: any) => <TicketDetail key={node.ticketId} ticket={node} />);
}

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
        <React.Fragment>
            <TwoColumns>
                <Sprints>
                    Sprints
                    {(data.allSprintProjects as any[]).map((sprintProject: any, index) => // TODO give ticket a type
                        <SprintProjectDetail key={index} sprintProject={sprintProject} />
                    )}
                </Sprints>
                <Tickets>
                    Tickets
                    <InfiniteScroll height="100%" width="100%" query={TICKET_PAGINATION_QUERY} variables={{}} numItems={10} afterId={""} itemName={"tickets"} renderItems={renderTickets} />
                </Tickets>
            </TwoColumns>
            <ThreeColumns>
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
            </ThreeColumns>
        </React.Fragment >
    );
}