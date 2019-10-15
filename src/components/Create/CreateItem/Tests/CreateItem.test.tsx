import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateItem } from "../CreateItem"

jest.mock("../../CreateProject", () => {
    return {
        CreateProject: () => <span>CREATE_PROJECT</span>,
    }
});

jest.mock("../../CreateSprint", () => {
    return {
        CreateSprint: () => <span>CREATE_PROJECT</span>,
    }
});

jest.mock("../../CreateTeam", () => {
    return {
        CreateTeam: () => <span>CREATE_PROJECT</span>,
    }
});

jest.mock("../../CreateTicket", () => {
    return {
        CreateTicket: () => <span>CREATE_PROJECT</span>,
    }
});

jest.mock("../../../NotFound", () => {
    return {
        NotFound: () => <span>NOT_FOUND</span>,
    }
});

describe("Tests for the CreateItem component", () => {
    test("Component matches snapshot", () => {
        const { container } = render(
            <CreateItem
                item="not-found"
            />,
        );
        expect(container).toMatchSnapshot();
    });

    test("Project case returns something", () => {
        const { queryByText } = render(
            <CreateItem
                item="project"
            />,
        );
        expect(queryByText("CREATE_PROJECT")).toBeDefined();
    });

    test("Sprint case returns something", () => {
        const { queryByText } = render(
            <CreateItem
                item="sprint"
            />,
        );
        expect(queryByText("CREATE_SPRINT")).toBeDefined();
    });

    test("Team case returns something", () => {
        const { queryByText } = render(
            <CreateItem
                item="team"
            />,
        );
        expect(queryByText("CREATE_TEAM")).toBeDefined();
    });

    test("Ticket case returns something", () => {
        const { queryByText } = render(
            <CreateItem
                item="ticket"
            />,
        );
        expect(queryByText("CREATE_TICKET")).toBeDefined();
    });
});
