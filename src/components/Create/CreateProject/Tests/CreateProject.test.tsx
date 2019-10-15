import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateProject, CREATE_PROJECT, GET_TEAMS } from "../CreateProject"
import { MockedProvider } from '@apollo/react-testing';

jest.mock("../../../Loaders/Loader", () => {
    return {
        Loader: () => <span>loading...</span>
    };
})

const teams = [
    {
        teamId: "5da4f7e39be0c7d43e05950b",
        teamName: "Canyon"
    },
    {
        teamId: "5da4f7e39be0c7d43e05950f",
        teamName: "Ridge"
    },
    {
        teamId: "5da4f7e39be0c7d43e059511",
        teamName: "Peak"
    },
];

const vars = { projectName: "PROJECT_NAME", teamId: "5da4f7e39be0c7d43e05950f", description: "DESCRIPTION" };
let numTimesSubmitted = 0;
const mocks = [
    {
        request: {
            query: GET_TEAMS,
            variables: {},
        },
        result: {
            data: {
                allTeams: teams,
            },
        },
    },
    {
        request: {
            query: CREATE_PROJECT,
            variables: vars,
        },

        result: () => {
            numTimesSubmitted++;
            return {
                data: {
                    createProject: {
                        project: {
                            projectId: "PROJECT_ID",
                            projectName: vars.projectName,
                            description: vars.description,
                        },
                    },
                },
            };
        },
    },
];

describe("Tests for the CreateProject component", () => {
    test("Component matches snapshot", async () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateProject />
            </MockedProvider>,
        );
        await wait();
        expect(container).toMatchSnapshot();
    });

    test("Displays loader when waiting for data", () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateProject />
            </MockedProvider>,
        );
        const loader = getByText("loading...");
        expect(loader).toBeDefined();
    });

    test("Displays error when request for data fails", async () => {
        const errorMock = {
            request: {
                query: GET_TEAMS,
                variables: {},
            },
            error: new Error("something went wrong..."),
        };
        const { getByText } = render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <CreateProject />
            </MockedProvider>,
        );
        await wait();
        const error = getByText("Network error: something went wrong...");
        expect(error).toBeDefined();
    });

    test("Changes project name correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateProject />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Project Name");
        fireEvent.change(input, { target: { value: vars.projectName } });
        expect(input).toHaveValue(vars.projectName);
    });

    test("Changes team correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateProject />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Team");
        fireEvent.change(input, { target: { value: vars.teamId } });
        expect(input).toHaveValue(vars.teamId);
    });

    test("Changes description correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateProject />
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
                <CreateProject />
            </MockedProvider>,
        );
        await wait();

        const projectName = getByLabelText("Project Name");
        fireEvent.change(projectName, { target: { value: vars.projectName } });

        const team = getByLabelText("Team");
        fireEvent.change(team, { target: { value: vars.teamId } });

        const description = getByLabelText("Description");
        fireEvent.change(description, { target: { value: vars.description } });

        const submit = getByText("submit");
        fireEvent.click(submit);
        await wait();
        expect(numTimesSubmitted).toEqual(1);
    });
});
