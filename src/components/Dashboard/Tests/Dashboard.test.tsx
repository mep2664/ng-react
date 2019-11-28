import React from "react"
import { render, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { Dashboard, GET_DATA } from "../Dashboard"
import { MockedProvider } from '@apollo/react-testing';

const tickets = [
    {
        projectName: "PROJECT_NAME", ticketNumber: "1", ticketId: "TICKET_ID_1",
        description: "DESCRIPTION", sprintName: "SPRINT_NAME", priority: "PRIORITY",
        ticketType: "TICKET_TYPE", storyPoints: "STORY_POINTS"
    },
    {
        projectName: "PROJECT_NAME", ticketNumber: "2", ticketId: "TICKET_ID_2",
        description: "DESCRIPTION", sprintName: "SPRINT_NAME", priority: "PRIORITY",
        ticketType: "TICKET_TYPE", storyPoints: "STORY_POINTS"
    },
];

const mocks = [
    {
        request: {
            query: GET_DATA,
            variables: {},
        },
        result: {
            data: {
                allTickets: tickets,
            },
        },
    },
];

jest.mock("../../TicketDetail", () => {
    return {
        TicketDetail: () => <span>TICKET_DETAIL</span>,
    }
});

jest.mock("../../Loaders/Loader", () => {
    return {
        Loader: () => <span>loading...</span>,
    }
});

describe("Tests for the Dashboard component", () => {
    test("Component matches snapshot", async () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Dashboard />
            </MockedProvider>,
        );
        await wait();
        expect(container).toMatchSnapshot();
    });

    test("Displays loading when waiting for data", () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Dashboard />
            </MockedProvider>);
        expect(getByText("loading...")).toBeDefined();
    });

    test("Displays loading when waiting for data", async () => {
        const errorMock = {
            request: {
                query: GET_DATA,
                variables: {},
            },
            error: new Error("something went wrong..."),
        };
        const { getByText } = render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Dashboard />
            </MockedProvider>);
        await wait()
        expect(getByText("Network error: something went wrong...")).toBeDefined();
    });

    test("Component renders TicketDetails", async () => {
        const { getAllByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Dashboard />
            </MockedProvider>,
        );
        await wait();
        expect(getAllByText("TICKET_DETAIL").length).toBe(2);
    });
});
