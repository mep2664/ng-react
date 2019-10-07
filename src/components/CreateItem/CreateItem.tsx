import * as React from "react";
import { SelectInput, TextInput } from "../../components";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_TICKET = gql`
    mutation createTicket($projectName: String!, $description: String, $priority: String,
        $sprintId: Int, $storyPoints: Int, $ticketType: String) {
            createTicket(projectName: $projectName, description: $description, priority: $priority,
                sprintId: $sprintId, storyPoints: $storyPoints, ticketType: $ticketType)
            {
                ticket {
                    ticketId
                    projectName
                    ticketNumber
                    description
                    priority
                    sprintId
                    storyPoints
                    ticketType
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

export const CreateItem: React.FC = () => {
    const [projectName, setProject] = React.useState<string>("");
    const [sprintId, setSprintId] = React.useState<string>("");
    const [ticketType, setTicketType] = React.useState<string>("");
    const [priority, setPriority] = React.useState<string>("");
    const [storyPoints, setStoryPoints] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>("");
    const [createTicket] = useMutation(CREATE_TICKET);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            projectName,
            sprintId,
            ticketType,
            priority,
            storyPoints,
            description,
        }
        console.log(data);
        createTicket({ variables: data });

    }

    return (
        <div>
            {`Create Ticket...`}
            <TicketInfo>
                <form action="localhost:5556/ticket" method="post" onSubmit={handleSubmit}>
                    <SelectInputs>
                        <SelectInput label="Project" name="project" options={projectOptions} value={projectName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProject(e.target.value)} />
                        <SelectInput label="Sprint" name="sprint" options={sprintOptions} value={sprintId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSprintId(e.target.value)} />
                        <SelectInput label="Type" name="type" options={typeOptions} value={ticketType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTicketType(e.target.value)} />
                        <SelectInput label="Priority" name="priority" options={priorityOptions} value={priority} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)} />
                        <SelectInput label="Story Points" name="storyPoints" options={storyPointsOptions()} value={storyPoints} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStoryPoints(Number(e.target.value))} />
                    </SelectInputs>
                    <DescriptionWrapper>
                        <label>Description</label>
                        <Description placeholder="Enter a ticket description here..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                    </DescriptionWrapper>
                    <input type="submit" value="submit" />
                </form>
            </TicketInfo>
        </div>
    );
}