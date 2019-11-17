import * as React from "react";
import { Loader, TextInput } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CircleLoader, IKanbanPanel, IKanbanItem } from "../../../components";
import KanbanBoard from "../../../components/Kanban/KanbanBoard";
import { bgColor } from "../../../theme";
import * as _ from "lodash";

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

const Wrapper = styled.div`
    position: relative;
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
    const [sprintName, setSprintName] = React.useState<string>("");

    ;
    const [projectName, setProjectName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const [ticketOrder, setTicketOrder] = React.useState<Array<any>>([]);
    const [panels, setPanels] = React.useState<IKanbanPanel[]>([]);
    const [initialItems, setItems] = React.useState<IKanbanItem[]>([]);
    const { loading, error, data } = useQuery(GET_SPRINT_PROJECT, { variables: { sprintProjectId }, fetchPolicy: "no-cache" });
    const [updateSprintProject] = useMutation(UPDATE_SPRINT_PROJECT);
    const [updateTicket, updateTicketState] = useMutation(UPDATE_TICKET);
    const [updateTicketOrder] = useMutation(UPDATE_TICKETS_ORDER);

    React.useEffect(() => {
        if (data && data.sprintProject) {
            setSprintName(data.sprintProject.sprintName);
            setProjectName(data.sprintProject.projectName);
            setGoal(data.sprintProject.goal);
            if (data.sprintProject.ticketStatuses.length > 0) {
                const statuses = data.sprintProject.ticketStatuses.map((status: Status) => (
                    {
                        title: status.statusLabel,
                        subtitle: "", // TODO: do we really need a subtitle?
                        accepts: ["ticket"],
                        onDrop: updateTicketStatus,
                    }
                ));
                setPanels(statuses);
                const sortedTickets: Ticket[] = data.sprintProject.tickets.sort((a: Ticket, b: Ticket) => a.kanbanIndex - b.kanbanIndex);
                const ticketItems: IKanbanItem[] = sortedTickets.map((ticket: Ticket, index) => (
                    {
                        panel: (data.sprintProject.ticketStatuses.find((status: Status) => status.statusId === ticket.statusId) as Status).statusLabel,
                        name: ticket.title,
                        link: { caption: `${ticket.projectName}-${ticket.ticketNumber}`, path: `/view/ticket/${ticket.projectName}-${ticket.ticketNumber}` },
                        type: "ticket",
                        index,
                        description: ticket.description,
                        externalId: ticket.ticketId,
                        indicatorColor: indicatorColorMap[ticket.ticketType as TicketType] ? indicatorColorMap[ticket.ticketType as TicketType] : bgColor["Warning"],
                        onDrop: handleTicketReorder,
                    }
                ));
                setItems(ticketItems);
                setTicketOrder(ticketItems.map(({ externalId }, index) => ({ ticketId: externalId, kanbanIndex: index })));
            }
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
        const statusId = (data.sprintProject.ticketStatuses.find((status: Status) => status.statusLabel === panel.title) as Status).statusId;
        const changes = {
            statusId
        };
        updateTicket({
            variables: { changes, ticketId: item.externalId }
        });
    };

    const handleTicketReorder = (items: IKanbanItem[]) => {
        setTicketOrder(items.map(({ externalId }, index) => ({ ticketId: externalId, kanbanIndex: index })));
    };

    window.onbeforeunload = () => {
        console.log(ticketOrder);
        if (ticketOrder) {
            updateTicketOrder({
                variables: { ticketOrder: { ticketOrder } }
            });
        }
    }

    if (panels.length === 0) {
        // TODO: this should probably be a loader, have to make
        // sure there is never a case where statuses is actually 0 though
        return (
            <div>nothing to display</div>
        );
    }

    return (
        <Wrapper>
            <div>{`Sprint: ${sprintName} - ${projectName}`}</div>
            <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleChange("goal", setGoal, e.target.value)} />
            <KanbanBoard
                initialPanels={panels}
                initialItems={initialItems}
            />
        </Wrapper>
    );
}