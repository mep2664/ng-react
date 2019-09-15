import * as React from "react";

export interface ITicket {
    project: string;
    ticketId: number;
}

export const Ticket: React.FC<ITicket> = ({ project, ticketId }) => {
    return (
        <div>{`Ticket: ${project}-${ticketId}`}</div>
    );
}