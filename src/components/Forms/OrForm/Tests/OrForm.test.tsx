import React from "react"
import { fireEvent, render, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { OrForm } from "../OrForm"

const leftFormTitle = "LF_TITLE";
const rightFormTitle = "RF_TITLE";
const props = {
    LeftFormID: "LEFT_FORM",
    RightFormID: "RIGHT_FORM",
    LeftButtonCaption: "LEFT_BTN",
    RightButtonCaption: "RIGHT_BTN",
    LeftForm: (props: any) => <form title={leftFormTitle} onSubmit={() => props.onSubmitChange(true)} />,
    RightForm: (props: any) => <form title={rightFormTitle} onSubmit={() => props.onSubmitChange(true)} />,
};

describe("Tests for the OrForm component", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("Component matches snapshot", () => {
        const { container } = render(
            <OrForm {...props} />
        );
        expect(container).toMatchSnapshot();
    });

    test("Left form is displayed on render", () => {
        const { getByTitle } = render(
            <OrForm {...props} />
        );
        expect(getByTitle(leftFormTitle)).toBeDefined();
    });

    test("Right form is displayed after right button click", () => {
        const { getByText, getByTitle, queryByTitle } = render(
            <OrForm {...props} />
        );
        expect(queryByTitle(rightFormTitle)).toBeNull();
        fireEvent.click(getByText(props.RightButtonCaption));
        expect(getByTitle(rightFormTitle)).toBeDefined();
    });

    test("Left form is displayed after left button click", () => {
        const { getByText, getByTitle, queryByTitle } = render(
            <OrForm {...props} />
        );
        fireEvent.click(getByText(props.RightButtonCaption));
        expect(queryByTitle(leftFormTitle)).toBeNull();
        fireEvent.click(getByText(props.LeftButtonCaption));
        expect(getByTitle(leftFormTitle)).toBeDefined();
    });

    test("Right button type is correct after form changes", () => {
        const { getByText } = render(
            <OrForm {...props} />
        );
        const rightBtn = getByText(props.RightButtonCaption);
        expect(rightBtn).toHaveAttribute("type", "button");
        fireEvent.click(rightBtn);
        expect(rightBtn).toHaveAttribute("type", "submit");
        fireEvent.click(getByText(props.LeftButtonCaption));
        expect(rightBtn).toHaveAttribute("type", "button");
    });

    test("Left button type is correct after form changes", () => {
        const { getByText } = render(
            <OrForm {...props} />
        );
        const leftBtn = getByText(props.LeftButtonCaption);
        const rightBtn = getByText(props.RightButtonCaption);
        expect(leftBtn).toHaveAttribute("type", "submit");
        fireEvent.click(rightBtn);
        expect(leftBtn).toHaveAttribute("type", "button");
        fireEvent.click(leftBtn);
        expect(leftBtn).toHaveAttribute("type", "submit");
        fireEvent.click(rightBtn);
        expect(leftBtn).toHaveAttribute("type", "button");
    });

    test("Loader is displayed after left form submit", async () => {
        const { getByTitle, getByRole } = render(
            <OrForm {...props} />
        );
        await wait();
        fireEvent.submit(getByTitle(leftFormTitle));
        const loading = getByRole("alert");
        expect(loading).toBeDefined();
        expect(loading).toHaveAttribute("aria-busy", "true");
    });

    test("Loader is displayed after right form submit", async () => {
        const { getByText, getByTitle, getByRole } = render(
            <OrForm {...props} />
        );
        await wait();
        fireEvent.click(getByText(props.RightButtonCaption));
        fireEvent.submit(getByTitle(rightFormTitle));
        const loading = getByRole("alert");
        expect(loading).toBeDefined();
        expect(loading).toHaveAttribute("aria-busy", "true");
    });
});
