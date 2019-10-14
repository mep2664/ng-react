import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Loader, TicketDetail } from "../";
import styled from "styled-components";

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

const Wrapper = styled.div`
    padding: 15px;
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
        <Wrapper>
            {data.allTickets.map((ticket: any) => // TODO give ticket a type
                <TicketDetail ticket={ticket} />
            )}
        </Wrapper>
    );
}

export const Dashboard: React.FC = () => {
    return (
        <div>
            {Tickets()}
        </div>
    );
}