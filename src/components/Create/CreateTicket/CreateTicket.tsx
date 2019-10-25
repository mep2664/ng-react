import * as React from "react";
import { Loader, SelectInput, TextArea } from "../..";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const GET_PROJECTS = gql`
query {
    allProjects {
        projectName
    }
    allSprints {
        sprintName
    }
}
`;

export const CREATE_TICKET = gql`
    mutation CreateTicket($description: String, $priority: String,
        $sprintName: String, $projectName: String, $storyPoints: Int, $ticketType: String) {
            createTicket(projectName: $projectName, description: $description, priority: $priority,
                sprintName: $sprintName, storyPoints: $storyPoints, ticketType: $ticketType)
            {
                ticket {
                    ticketId
                    projectName
                    ticketNumber
                    description
                    priority
                    sprintName
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

export const CreateTicket: React.FC = () => {
    const [projectName, setProjectName] = React.useState<string>("");
    const [sprintName, setSprintName] = React.useState<string>("");
    const [ticketType, setTicketType] = React.useState<string>("");
    const [priority, setPriority] = React.useState<string>("");
    const [storyPoints, setStoryPoints] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_PROJECTS);
    const [createTicket] = useMutation(CREATE_TICKET);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ticketData = {
            projectName,
            sprintName,
            ticketType,
            priority,
            storyPoints,
            description,
        }
        createTicket({ variables: ticketData })
            .catch((error) => alert(error.message));
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

    const projectOptions = data.allProjects.map((project: any) => { return { caption: project.projectName, value: project.projectName } });
    const sprintOptions = data.allSprints.map((sprint: any) => { return { caption: sprint.sprintName, value: sprint.sprintName } });

    return (
        <div>
            {`Create Ticket...`}
            <TicketInfo>
                <form action="localhost:5556/ticket" method="post" onSubmit={handleSubmit}>
                    <SelectInputs>
                        <SelectInput label="Project" name="project" options={projectOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjectName(e.target.value)} />
                        <SelectInput label="Sprint" name="sprint" options={sprintOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSprintName(e.target.value)} />
                        <SelectInput label="Type" name="type" options={typeOptions} value={ticketType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTicketType(e.target.value)} />
                        <SelectInput label="Priority" name="priority" options={priorityOptions} value={priority} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)} />
                        <SelectInput label="Story Points" name="storyPoints" options={storyPointsOptions()} value={storyPoints} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStoryPoints(e.target.value)} />
                    </SelectInputs>
                    <DescriptionWrapper>
                        <TextArea label="Description" name="description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                    </DescriptionWrapper>
                    <input type="submit" value="submit" />
                </form>
            </TicketInfo>
        </div>
    );
}