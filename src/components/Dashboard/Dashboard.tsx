import * as React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loader, TicketDetail } from "../";

const GET_TICKETS = gql`
    {
        allTickets {
            projectName
            ticketNumber
            ticketId
            description
            sprintName
            priority
            ticketType
            storyPoints
        }
    }
`;

const Tickets = () => {
    const { loading, error, data } = useQuery(GET_TICKETS, { fetchPolicy: "no-cache" });
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return error.message;
    }

    return (
        <div>
            {data.allTickets.map((ticket: any) => // TODO give ticket a type
                <TicketDetail ticket={ticket} />
            )}
        </div>
    );
}

export const Dashboard: React.FC = () => {
    return (
        <div>
            {Tickets()}
        </div>
    );
}