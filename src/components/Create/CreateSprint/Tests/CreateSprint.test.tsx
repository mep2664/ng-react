import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateSprint, CREATE_SPRINT } from "../CreateSprint"
import { MockedProvider } from '@apollo/react-testing';

const vars = { sprintName: "SPRINT_NAME", goal: "GOAL", dateStart: "2019-01-01", dateEnd: "2019-01-15" };
let numTimesSubmitted = 0;
const mocks = [
    {
        request: {
            query: CREATE_SPRINT,
            variables: { ...vars, dateStart: new Date(vars.dateStart).toISOString(), dateEnd: new Date(vars.dateEnd).toISOString() },
        },

        result: () => {
            numTimesSubmitted++;
            return {
                data: {
                    project: {
                        sprintId: "SPRINT_ID",
                        sprintName: vars.sprintName,
                        goal: vars.goal,
                        dateStart: new Date(vars.dateStart).toISOString(),
                        dateEnd: new Date(vars.dateEnd).toISOString(),
                    },
                },
            };
        },
    },
];

describe("Tests for the CreateSprint component", () => {
    test("Component matches snapshot", async () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();
        expect(container).toMatchSnapshot();
    });

    test("Changes sprint name correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Sprint Name");
        fireEvent.change(input, { target: { value: vars.sprintName } });
        expect(input).toHaveValue(vars.sprintName);
    });

    test("Changes goal correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Goal");
        fireEvent.change(input, { target: { value: vars.goal } });
        expect(input).toHaveValue(vars.goal);
    });

    test("Changes date start correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Date Start");
        fireEvent.change(input, { target: { value: vars.dateStart } });
        expect(input).toHaveValue(vars.dateStart);
    });

    test("Changes date end correctly", async () => {
        const { getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();
        const input = getByLabelText("Date Start");
        fireEvent.change(input, { target: { value: vars.dateEnd } });
        expect(input).toHaveValue(vars.dateEnd);
    });

    test("Submits correctly", async () => {
        const { getByText, getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateSprint />
            </MockedProvider>,
        );
        await wait();

        const sprintName = getByLabelText("Sprint Name");
        fireEvent.change(sprintName, { target: { value: vars.sprintName } });

        const goal = getByLabelText("Goal");
        fireEvent.change(goal, { target: { value: vars.goal } });

        const dateStart = getByLabelText("Date Start");
        fireEvent.change(dateStart, { target: { value: vars.dateStart } });

        const dateEnd = getByLabelText("Date End");
        fireEvent.change(dateEnd, { target: { value: vars.dateEnd } });

        const submit = getByText("submit");
        fireEvent.click(submit);
        await wait();
        expect(numTimesSubmitted).toEqual(1);
    });
});
