import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateTeam, CREATE_TEAM } from "../CreateTeam"
import { MockedProvider } from '@apollo/react-testing';

const today = new Date();
const dateCreated = new Date(`${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`).toISOString();
const vars = { teamName: "TEAM_ID", status: "Active" };
let numTimesSubmitted = 0;
const mocks = [
    {
        request: {
            query: CREATE_TEAM,
            variables: { ...vars, dateCreated },
        },

        result: () => {
            numTimesSubmitted++;
            return {
                data: {
                    createTeam: {
                        team: {
                            teamId: "TEAM_ID",
                            teamName: vars.teamName,
                            status: vars.status,
                            dateCreated,
                        },
                    },
                },
            };
        },
    },
];

describe("Tests for the CreateTeam component", () => {
    test("Component matches snapshot", async () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTeam />
            </MockedProvider>,
        );
        await wait();
        expect(container).toMatchSnapshot();
    });

    test("Changes team name correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTeam />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Team Name");
        fireEvent.change(input, { target: { value: vars.teamName } });
        expect(input).toHaveValue(vars.teamName);
    });

    test("Changes status correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTeam />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Status");
        fireEvent.change(input, { target: { value: vars.status } });
        expect(input).toHaveValue(vars.status);
    });

    test("Submits correctly", async () => {
        const { getByText, getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateTeam />
            </MockedProvider>,
        );
        await wait();

        const teamName = getByLabelText("Team Name");
        fireEvent.change(teamName, { target: { value: vars.teamName } });

        const status = getByLabelText("Status");
        fireEvent.change(status, { target: { value: vars.status } });

        const submit = getByText("submit");
        fireEvent.click(submit);
        await wait();
        expect(numTimesSubmitted).toEqual(1);
    });
});
