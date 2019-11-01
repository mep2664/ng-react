import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { KanbanBoard, IKanbanPanel, IKanbanItem } from "../../../components";
import { bgColor } from "../../../theme";

const GET_SPRINT_PROJECT = gql`
    query ($sprintProjectId: ID!) {
        sprintProject(sprintProjectId: $sprintProjectId) {
            sprintName
            projectName
            goal
            ticketStatuses {
                statusId
                statusOrder
                statusLabel
                projectId
            }
            tickets {
                ticketId
                projectName
                sprintName
                ticketType
                priority
                storyPoints
                title
                description
                activeUserId
                statusId
                kanbanIndex
            }
        }
    }
`;

const UPDATE_SPRINT_PROJECT = gql`
    mutation updateSprintProject($changes: SprintProjectInput!, $sprintProjectId: ID! ) {
        updateSprintProject(changes: $changes, sprintProjectId: $sprintProjectId) {
            sprintProject {
                sprintProjectId
                sprintId
                projectId
                goal
            }
        }
    }
`;

const UPDATE_TICKET = gql`
    mutation updateTicket($changes: TicketInput!, $ticketId: ID! ) {
        updateTicket(changes: $changes, ticketId: $ticketId) {
            ticket {
                ticketId
                ticketNumber
                projectName
                sprintName
                ticketType
                priority
                storyPoints
                description
                kanbanIndex
            }
        }
    }
`;

const UPDATE_TICKETS_ORDER = gql`
    mutation updateTicketOrder($ticketOrder: OrderInput!) {
        updateTicketOrder(ticketOrder: $ticketOrder) {
            success
        }
    }
`;

interface Status {
    statusId: string;
    statusOrder: number;
    statusLabel: string;
    projectId: string;
}

interface Ticket {
    ticketId: string;
    projectName: string;
    sprintName: string;
    ticketType: string;
    priority: string;
    storyPoints: number;
    description: string;
    title: string;
    activeUserId: string;
    statusId: string;
    sprintProjectId: string;
    kanbanIndex: number;
}

export interface ISprint {
    sprintProjectId: string;
}

export const ViewSprint: React.FC<ISprint> = ({ sprintProjectId }) => {
    const [sprintName, setSprintName] = React.useState<string>("");;
    const [projectName, setProjectName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const [statuses, setStatuses] = React.useState<Array<Status>>([]);
    const [tickets, setTickets] = React.useState<Array<Ticket>>([]);
    const { loading, error, data, refetch } = useQuery(GET_SPRINT_PROJECT, { variables: { sprintProjectId }, fetchPolicy: "no-cache" });
    const [updateSprintProject] = useMutation(UPDATE_SPRINT_PROJECT);
    const [updateTicket] = useMutation(UPDATE_TICKET);
    const [updateTicketOrder] = useMutation(UPDATE_TICKETS_ORDER);

    React.useLayoutEffect(() => {
        if (data && data.sprintProject) {
            setSprintName(data.sprintProject.sprintName);
            setProjectName(data.sprintProject.projectName);
            setGoal(data.sprintProject.goal);
            setStatuses(data.sprintProject.ticketStatuses);
            setTickets(data.sprintProject.tickets);
        }
    }, [data]);

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        const changes: any = {};
        changes[attribute] = value;
        updateSprintProject({ variables: { changes, sprintProjectId } });
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

    const updateTicketStatus = (panel: IKanbanPanel, item: IKanbanItem) => {
        const statusId = (statuses.find((status) => status.statusLabel === panel.title) as Status).statusId;
        const changes = {
            statusId
        };
        updateTicket({
            variables: { changes, ticketId: item.externalId }, update: () => {
                refetch({ sprintProjectId });
            }
        });
    };

    const handleTicketReorder = (items: IKanbanItem[]) => {
        const ticketOrder = items.map(({ externalId, index }) => ({ ticketId: externalId, kanbanIndex: index }));
        updateTicketOrder({ variables: { ticketOrder: { ticketOrder } } })
    };

    return (
        <div>
            <React.Fragment>
                <div>{`Sprint: ${sprintName} - ${projectName}`}</div>
                <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("goal", setGoal, e.target.value)} />
                <KanbanBoard
                    initialPanels={
                        statuses.map((status) => (
                            {
                                title: status.statusLabel,
                                subtitle: status.statusLabel,
                                accepts: ["ticket"],
                                onDrop: updateTicketStatus,
                            }
                        ))
                    }
                    initialItems={
                        tickets.sort((a, b) => a.kanbanIndex - b.kanbanIndex).map((ticket) => (
                            {
                                panel: (statuses.find((status) => status.statusId === ticket.statusId) as Status).statusLabel,
                                name: ticket.title,
                                type: "ticket",
                                index: ticket.kanbanIndex,
                                description: ticket.description,
                                externalId: ticket.ticketId,
                                indicatorColor: bgColor.Primary,
                                onDrop: handleTicketReorder,
                            }
                        ))
                    } />
            </React.Fragment>
        </div >
    );
}