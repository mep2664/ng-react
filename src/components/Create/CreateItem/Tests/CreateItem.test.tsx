import React from "react"
import { render, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { CreateItem } from "../CreateItem"

jest.mock("../../CreateProject", () => {
    return {
        CreateProject: () => <span>CREATE_PROJECT</span>,
    }
});

jest.mock("../../CreateSprint", () => {
    return {
        CreateSprint: () => <span>CREATE_SPRINT</span>,
    }
});

jest.mock("../../CreateTeam", () => {
    return {
        CreateTeam: () => <span>CREATE_TEAM</span>,
    }
});

jest.mock("../../CreateTicket", () => {
    return {
        CreateTicket: () => <span>CREATE_TICKET</span>,
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

    test("Project case returns project", () => {
        const { getByText } = render(
            <CreateItem
                item="project"
            />,
        );
        expect(getByText("CREATE_PROJECT")).toBeDefined();
    });

    test("Sprint case returns sprint", () => {
        const { getByText } = render(
            <CreateItem
                item="sprint"
            />,
        );
        expect(getByText("CREATE_SPRINT")).toBeDefined();
    });

    test("Team case returns team", () => {
        const { getByText } = render(
            <CreateItem
                item="team"
            />,
        );
        expect(getByText("CREATE_TEAM")).toBeDefined();
    });

    test("Ticket case returns ticket", () => {
        const { getByText } = render(
            <CreateItem
                item="ticket"
            />,
        );
        expect(getByText("CREATE_TICKET")).toBeDefined();
    });

    test("Unknown case returns not found", () => {
        const { getByText } = render(
            <CreateItem
                item="<there is no way this is a url param>"
            />,
        );
        expect(getByText("NOT_FOUND")).toBeDefined();
    });
});
