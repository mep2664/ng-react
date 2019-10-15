import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateTicket, CREATE_TICKET, GET_PROJECTS } from "../CreateTicket"
import { MockedProvider } from '@apollo/react-testing';

jest.mock("../../../Loaders/Loader", () => {
    return {
        Loader: () => <span>loading...</span>
    };
})

const projects = [
    {
        projectName: "PROJECT-1",
    },
    {
        projectName: "PROJECT-2",
    },
    {
        projectName: "PROJECT-3",
    },
];

const sprints = [
    {
        sprintName: "SPRINT-1",
    },
    {
        sprintName: "SPRINT-2",
    },
    {
        sprintName: "SPRINT-3",
    },
];

const vars = {
    projectName: "PROJECT-3", sprintName: "SPRINT-2", ticketType: "Enhancement",
    priority: "Standard", storyPoints: "3", description: "NEW_DESCRIPTION",
};
let numTimesSubmitted = 0;
const mocks = [
    {
        request: {
            query: GET_PROJECTS,
            variables: {},
        },
        result: {
            data: {
                allProjects: projects,
                allSprints: sprints,
            },
        },
    },
    {
        request: {
            query: CREATE_TICKET,
            variables: vars,
        },

        result: () => {
            numTimesSubmitted++;
            return {
                data: {
                    createTicket: {
                        ticket: {
                            ticketId: "TICKET_ID",
                            projectName: vars.projectName,
                            ticketNumber: "1",
                            sprintName: vars.sprintName,
                            ticketType: vars.ticketType,
                            priority: vars.priority,
                            storyPoints: vars.storyPoints,
                            description: vars.description,
                        },
                    }
                },
            };
        },
    },
];

describe("Tests for the CreateTicket component", () => {
    test("Component matches snapshot", async () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        expect(container).toMatchSnapshot();
    });

    test("Displays loader when waiting for data", () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        const loader = getByText("loading...");
        expect(loader).toBeDefined();
    });

    test("Displays error when request for data fails", async () => {
        const errorMock = {
            request: {
                query: GET_PROJECTS,
                variables: {},
            },
            error: new Error("something went wrong..."),
        };
        const { getByText } = render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const error = getByText("Network error: something went wrong...");
        expect(error).toBeDefined();
    });

    test("Changes project name correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Project");
        fireEvent.change(input, { target: { value: vars.projectName } });
        expect(input).toHaveValue(vars.projectName);
    });

    test("Changes sprint name correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Sprint");
        fireEvent.change(input, { target: { value: vars.sprintName } });
        expect(input).toHaveValue(vars.sprintName);
    });

    test("Changes type correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Type");
        fireEvent.change(input, { target: { value: vars.ticketType } });
        expect(input).toHaveValue(vars.ticketType);
    });

    test("Changes priority correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Priority");
        fireEvent.change(input, { target: { value: vars.priority } });
        expect(input).toHaveValue(vars.priority);
    });

    test("Changes story points correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Story Points");
        fireEvent.change(input, { target: { value: vars.storyPoints } });
        expect(input).toHaveValue(vars.storyPoints);
    });

    test("Changes description correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Description");
        fireEvent.change(input, { target: { value: vars.description } });
        expect(input).toHaveValue(vars.description);
    });

    test("Submits correctly", async () => {
        const { getByText, getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTicket />
            </MockedProvider>,
        );
        await wait();

        const project = getByLabelText("Project");
        fireEvent.change(project, { target: { value: vars.projectName } });

        const sprint = getByLabelText("Sprint");
        fireEvent.change(sprint, { target: { value: vars.sprintName } });

        const type = getByLabelText("Type");
        fireEvent.change(type, { target: { value: vars.ticketType } });

        const priority = getByLabelText("Priority");
        fireEvent.change(priority, { target: { value: vars.priority } });

        const storyPoints = getByLabelText("Story Points");
        fireEvent.change(storyPoints, { target: { value: vars.storyPoints } });

        const description = getByLabelText("Description");
        fireEvent.change(description, { target: { value: vars.description } });

        const submit = getByText("submit");
        fireEvent.click(submit);
        await wait();
        expect(numTimesSubmitted).toEqual(1);
    });
});
