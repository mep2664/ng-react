import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { KanbanBoard, IKanban, IKanbanPanel, IKanbanItem } from "../../../components";
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
                ticketNumber
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
    ticketNumber: number;
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

type TicketType = "Enhancement" | "Research" | "Bug";

interface ITicketTypeMap {
    Enhancement: string;
    Research: string;
    Bug: string;
}

const indicatorColorMap: ITicketTypeMap = {
    Enhancement: bgColor["Positive"]!,
    Research: bgColor["Primary"]!,
    Bug: bgColor["Error"]!,
}

export interface ISprint {
    sprintProjectId: string;
}

export const ViewSprint: React.FC<ISprint> = ({ sprintProjectId }) => {
    const [sprintName, setSprintName] = React.useState<string>("");;
    const [projectName, setProjectName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const [statuses, setStatuses] = React.useState<Array<Status>>([]);
    const [panels, setPanels] = React.useState<IKanban[]>([]);
    const { loading, error, data } = useQuery(GET_SPRINT_PROJECT, { variables: { sprintProjectId }, fetchPolicy: "no-cache" });
    const [updateSprintProject] = useMutation(UPDATE_SPRINT_PROJECT);
    const [updateTicket] = useMutation(UPDATE_TICKET);
    const [updateTicketOrder] = useMutation(UPDATE_TICKETS_ORDER);

    React.useLayoutEffect(() => {
        if (data && data.sprintProject) {
            setSprintName(data.sprintProject.sprintName);
            setProjectName(data.sprintProject.projectName);
            setGoal(data.sprintProject.goal);
            setStatuses(data.sprintProject.ticketStatuses);
            const sortedTickets: Ticket[] = data.sprintProject.tickets.sort((a: Ticket, b: Ticket) => a.kanbanIndex - b.kanbanIndex);
            const panels: IKanban[] = [];
            data.sprintProject.ticketStatuses.forEach((status: Status) => {
                const statusTickets = sortedTickets.filter((ticket: Ticket) => ticket.statusId === status.statusId);
                const kanbanItems = statusTickets.map((statusTicket) => ({
                    name: statusTicket.title,
                    link: { caption: `${statusTicket.projectName}-${statusTicket.ticketNumber}`, path: `/view/ticket/${statusTicket.projectName}-${statusTicket.ticketNumber}` },
                    type: "ticket",
                    index: statusTicket.kanbanIndex,
                    description: statusTicket.description,
                    externalId: statusTicket.ticketId,
                    indicatorColor: indicatorColorMap[statusTicket.ticketType as TicketType] ? indicatorColorMap[statusTicket.ticketType as TicketType] : bgColor["Warning"],
                    onDrop: handleTicketReorder,
                }));
                panels.push({
                    panel: status.statusLabel,
                    items: kanbanItems,
                });
            })
            setPanels(panels);
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

    const handleKanbanPanelChange = (changedPanel: string, changedItemId: string) => {
        updateTicketStatus(changedPanel, changedItemId)
    }

    const handleKanbanOrderChange = (panels: IKanban[]) => {
        handleTicketReorder(panels.reduce((acc, curr) => acc.concat(curr.items), new Array<IKanbanItem>()));
    }


    const updateTicketStatus = (panelTitle: string, itemId: string) => {
        const statusId = (statuses.find((status) => status.statusLabel === panelTitle) as Status).statusId;
        const changes = {
            statusId
        };
        updateTicket({ variables: { changes, ticketId: itemId } });
    };

    const handleTicketReorder = (items: IKanbanItem[]) => {
        const ticketOrder = items.map(({ externalId }, index) => ({ ticketId: externalId, kanbanIndex: index }));
        updateTicketOrder({ variables: { ticketOrder: { ticketOrder } } });
    };

    if (statuses.length === 0) {
        // TODO: this should probably be a loader, have to make
        // sure there is never a case where statuses is actually 0 though
        return (
            <div>nothing to display</div>
        );
    }
    return (
        <div>
            <React.Fragment>
                <div>{`Sprint: ${sprintName} - ${projectName}`}</div>
                <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("goal", setGoal, e.target.value)} />
                <KanbanBoard initialPanels={panels} onOrderChange={handleKanbanOrderChange} onPanelChange={handleKanbanPanelChange} />
            </React.Fragment>
        </div >
    );
}