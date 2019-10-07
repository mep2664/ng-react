import * as React from "react";
import { SelectInput, TextInput } from "../../components";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_TICKET = gql`
    query ($projectName: String! $ticketNumber: Int!) {
        tickets(projectName: $projectName, ticketNumber: $ticketNumber) {
            edges {
                node {
                    projectName
                    ticketNumber
                    ticketId
                    description
                    sprintId
                    priority
                    ticketType
                    storyPoints
                }
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
                sprintId
                ticketType
                priority
                storyPoints
                description
            }
        }
    }
`;

const TicketInfo = styled.div`
    display: grid;
    grid-gap: 25px;
    align-items: center;
    justify-items: end;
    grid-template-columns: minmax(auto, 300px) auto;
    box-sizing: border-box;
    padding: 25px;
`;

const SelectInputs = styled.div`
    display: grid;
    grid-gap: 10px;
    align-items: center;
    justify-items: end;
    grid-template-columns: auto minmax(auto, 300px);
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const Description = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
    resize: none;
`;

export interface ITicket {
    project: string;
    ticketNumber: number;
}

const projectOptions = [
    { caption: "Polaris", value: "POLARIS" },
    { caption: "Pitcher", value: "PITCHER" },
];

const sprintOptions = [
    { caption: "Sprint-One", value: 1 },
    { caption: "Sprint-Two", value: 2 },
];

const typeOptions = [
    { caption: "Enhancement", value: "Enhancement" },
    { caption: "Bug", value: "Bug" },
    { caption: "Research", value: "Research" },
];

const priorityOptions = [
    { caption: "Blocker", value: "Blocker" },
    { caption: "Standard", value: "Standard" },
    { caption: "Minor", value: "Minor" },
];

const storyPointsOptions = () => {
    const sequence: number[] = [1, 2];
    for (let idx = 0; idx < 5; idx++) {
        sequence.push(sequence[idx] + sequence[idx + 1]);
    }
    const options: any[] = [];
    for (let numb in sequence) {
        options.push({ caption: sequence[numb].toString(), value: sequence[numb] });
    }
    return options;
}

export const Ticket: React.FC<ITicket> = ({ project, ticketNumber }) => {
    const [ticketId, setTicketId] = React.useState<string>("");
    const [projectName, setProject,] = React.useState<string>(project);
    const [sprintId, setSprintId] = React.useState<string>("");
    const [ticketType, setTicketType] = React.useState<string>("");
    const [priority, setPriority] = React.useState<string>("");
    const [storyPoints, setStoryPoints] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_TICKET, { variables: { projectName, ticketNumber } });
    const [updateTicket] = useMutation(UPDATE_TICKET);

    React.useLayoutEffect(() => {
        if (data && data.tickets.edges.length > 0) {
            const ticket = data.tickets.edges[0].node;
            setTicketId(ticket.ticketId);
            console.log(ticketId);
            setSprintId(ticket.sprintId || "");
            setTicketType(ticket.ticketType || "");
            setPriority(ticket.priority || "");
            setStoryPoints(ticket.storyPoints || "");
            setDescription(ticket.description || "");
        }
    }, [data]);

    React.useEffect(() => {
        window.history.replaceState({}, document.title, `/ticket/${projectName}-${ticketNumber}`);
    }, [projectName])

    const handleChange = (attribute: string, setState: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setState(value);
        console.log(`handleChange - ${value} = ${ticketType}`)
        const changes: any = {};
        changes[attribute] = value;
        updateTicket({ variables: { changes, ticketId } });
    }

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>
    }

    console.log("render");
    console.log(ticketType);
    return (
        <div>
            <React.Fragment>
                <span>{`Ticket: ${projectName}-${ticketNumber}`}</span>
                <TicketInfo>
                    <SelectInputs>
                        <SelectInput label="Project" name="project" options={projectOptions} value={projectName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("projectName", setProject, e.target.value)} />
                        <SelectInput label="Sprint" name="sprint" options={sprintOptions} value={sprintId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("sprintId", setSprintId, Number(e.target.value))} />
                        <SelectInput label="Type" name="type" options={typeOptions} value={ticketType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("ticketType", setTicketType, e.target.value)} />
                        <SelectInput label="Priority" name="priority" options={priorityOptions} value={priority} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("priority", setPriority, e.target.value)} />
                        <SelectInput label="Story Points" name="storyPoints" options={storyPointsOptions()} value={storyPoints} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("storyPoints", setStoryPoints, Number(e.target.value))} />
                    </SelectInputs>
                    <DescriptionWrapper>
                        <label>Description</label>
                        <Description placeholder="Enter a ticket description here..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("description", setDescription, e.target.value)} />
                    </DescriptionWrapper>
                </TicketInfo>
            </React.Fragment>
        </div >
    );
}