import * as React from "react";
import { SelectInput, TextInput } from "../../components";
import styled from "styled-components";

const TicketInfo = styled.div`
    max-width: 450px;
    display: grid;
    grid-gap: 10px;
    align-items: center;
    justify-items: end;
    grid-template-rows: repeat(1fr);
    grid-template-columns: auto 1fr;
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
    return (
        <div>
            {`Ticket: ${project}-${ticketId}`}
            <TicketInfo>
                <SelectInput label="Project" name="project" options={testOptions} />
                <SelectInput label="Type" name="type" options={testOptions} />
                <SelectInput label="Priority" name="priority" options={testOptions} />
                <SelectInput label="Story Points" name="storyPoints" options={storyPointsOptions()} />
            </TicketInfo>
        </div>
    );
}