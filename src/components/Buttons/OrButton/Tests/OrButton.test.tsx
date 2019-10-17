import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { OrButton } from "../OrButton"
import { ButtonType } from "../../";

describe("Tests for the Button component", () => {
    const leftCaption = "LEFT_CAPTION";
    const rightCaption = "RIGHT_CAPTION";
    const leftOnClick = jest.fn();
    const rightOnClick = jest.fn();
    const leftForm = "LEFT_FORM";
    const rightForm = "RIGHT_FORM";
    const leftType: ButtonType = "submit";
    const rightType: ButtonType = "reset";

    const props = {
        leftCaption, rightCaption, leftOnClick, rightOnClick, leftForm, rightForm, leftType, rightType,
    };

    test("Component matches snapshot", () => {
        const { container } = render(
            <OrButton
                {...props}
            />,
        );
        expect(container).toMatchSnapshot();
    });

    test("Left button exists", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        expect(getByText(leftCaption)).toBeDefined();
    });

    test("Right button exists", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        expect(getByText(rightCaption)).toBeDefined();
    });

    test("Empty types attribute is set correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
                leftType={undefined}
                rightType={undefined}
            />,
        )
        const leftButton = getByText(leftCaption);
        expect(leftButton).toHaveAttribute("type", "button");
        const rightButton = getByText(rightCaption);
        expect(rightButton).toHaveAttribute("type", "button");
    });

    test("leftType attribute is set correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(leftCaption);
        expect(button).toHaveAttribute("type", leftType);
    });

    test("rightType attribute is set correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(rightCaption);
        expect(button).toHaveAttribute("type", rightType);
    });

    test("leftForm attribute is set correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(leftCaption);
        expect(button).toHaveAttribute("form", leftForm);
    });

    test("rightForm attribute is set correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(rightCaption);
        expect(button).toHaveAttribute("form", rightForm);
    });

    test("leftOnClick event fires correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(leftCaption);
        fireEvent.click(button);
        expect(leftOnClick).toHaveBeenCalledTimes(1);
    });

    test("rightOnClick event fires correctly", () => {
        const { getByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = getByText(rightCaption);
        fireEvent.click(button);
        expect(rightOnClick).toHaveBeenCalledTimes(1);
    });
});
