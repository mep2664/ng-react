import * as React from "react";
import { SelectInput, TextInput } from "../../components";
import styled from "styled-components";

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
    ticketId: number;
}

const testOptions = [
    { caption: "ProjectOne", value: 1 },
    { caption: "ProjectTwp", value: 2 },
    { caption: "ProjectThree", value: 3 },
    { caption: "ProjectFour", value: 4 },
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

export const Ticket: React.FC<ITicket> = ({ project, ticketId }) => {
    const [projectName, setProject] = React.useState<string>(project);
    const [sprint, setSprint] = React.useState<string>("");
    const [type, setType] = React.useState<string>("");
    const [priority, setPriority] = React.useState<string>("");
    const [storyPoints, setStoryPoints] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            projectName,
            sprint,
            type,
            priority,
            storyPoints,
            description,
        }
        fetch("http://localhost:5556/ticket", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response);
        }, (failure) => console.log(failure));
    }

    return (
        <div>
            {`Ticket: ${project}-${ticketId}`}
            <TicketInfo>
                <form action="localhost:5556/ticket" method="post" onSubmit={handleSubmit}>
                    <SelectInputs>
                        <SelectInput label="Project" name="project" options={testOptions} value={projectName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProject(e.target.value)} />
                        <SelectInput label="Sprint" name="sprint" options={testOptions} value={sprint} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSprint(e.target.value)} />
                        <SelectInput label="Type" name="type" options={testOptions} value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)} />
                        <SelectInput label="Priority" name="priority" options={testOptions} value={priority} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)} />
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