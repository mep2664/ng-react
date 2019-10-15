import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { OrButton } from "../OrButton"
import { ButtonType } from "../../";

describe("Tests for the Button component", () => {
    const LeftCaption = "LEFT_CAPTION";
    const RightCaption = "RIGHT_CAPTION";
    const LeftOnClick = jest.fn();
    const RightOnClick = jest.fn();
    const LeftForm = "LEFT_FORM";
    const RightForm = "RIGHT_FORM";
    const LeftType: ButtonType = "submit";
    const RightType: ButtonType = "reset";

    const props = {
        LeftCaption, RightCaption, LeftOnClick, RightOnClick, LeftForm, RightForm, LeftType, RightType,
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
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        expect(queryByText(LeftCaption)).toBeDefined();
    });

    test("Right button exists", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        expect(queryByText(RightCaption)).toBeDefined();
    });

    test("Empty types attribute is set correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
                LeftType={undefined}
                RightType={undefined}
            />,
        )
        const leftButton = queryByText(LeftCaption) as HTMLButtonElement;
        expect(leftButton).toHaveAttribute("type", "button");
        const rightButton = queryByText(RightCaption) as HTMLButtonElement;
        expect(rightButton).toHaveAttribute("type", "button");
    });

    test("LeftType attribute is set correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(LeftCaption) as HTMLButtonElement;
        expect(button).toHaveAttribute("type", LeftType);
    });

    test("RightType attribute is set correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(RightCaption) as HTMLButtonElement;
        expect(button).toHaveAttribute("type", RightType);
    });

    test("LeftForm attribute is set correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(LeftCaption) as HTMLButtonElement;
        expect(button).toHaveAttribute("form", LeftForm);
    });

    test("RightForm attribute is set correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(RightCaption) as HTMLButtonElement;
        expect(button).toHaveAttribute("form", RightForm);
    });

    test("LeftOnClick event fires correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(LeftCaption) as HTMLButtonElement;
        fireEvent.click(button);
        expect(LeftOnClick).toHaveBeenCalledTimes(1);
    });

    test("RightOnClick event fires correctly", () => {
        const { queryByText } = render(
            <OrButton
                {...props}
            />,
        )
        const button = queryByText(RightCaption) as HTMLButtonElement;
        fireEvent.click(button);
        expect(RightOnClick).toHaveBeenCalledTimes(1);
    });
});
