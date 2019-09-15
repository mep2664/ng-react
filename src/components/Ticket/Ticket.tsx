import * as React from "react";
import { TextInput } from "../../components";
import styled from "styled-components";

const TicketInfo = styled.div`
    max-width: 450px;
`;

export interface ITicket {
    project: string;
    ticketId: number;
}

export const Ticket: React.FC<ITicket> = ({ project, ticketId }) => {
    return (
        <div>
            {`Ticket: ${project}-${ticketId}`}
            <TicketInfo>
                <TextInput align="horizontal" label="Project" name="type" />
                <TextInput align="horizontal" label="Type" name="type" />
                <TextInput align="horizontal" label="Priority" name="type" />
                <TextInput align="horizontal" label="Story Points" name="type" />
            </TicketInfo>
        </div>
    );
}