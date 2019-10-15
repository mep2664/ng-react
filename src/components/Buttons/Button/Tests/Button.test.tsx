import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../../theme";
import { Button } from "../Button"
import { ButtonType } from "../../";

describe("Tests for the Button component", () => {
    const Caption = "BUTTON_CAPTION";
    const OnClick = jest.fn();
    const Emphasis: emphasisType = "Primary";
    const Type: ButtonType = "button";

    const props = {
        Caption, OnClick, Emphasis, Type,
    };

    test("Component matches snapshot", () => {
        const { container } = render(
            <Button
                {...props}
            />,
        );
        expect(container).toMatchSnapshot();
    });

    test("Button exists", () => {
        const { getByText } = render(
            <Button
                {...props}
            />,
        )
        expect(getByText(Caption)).toBeDefined();
    });

    test("Emphasis style is applied correctly", () => {
        const { container } = render(
            <Button
                {...props}
            />,
        )
        const button = container.firstElementChild as HTMLElement;
        expect(button).toHaveStyle(`background-color: ${backgroundColor[Emphasis]}; color: ${fontColor[Emphasis]}`);

        fireEvent.mouseOver(button);
        expect(button).toHaveStyle(`background-color: ${hoverBackgroundColor[Emphasis]}`);
    });

    test("onClick event fires correctly", () => {
        const { container } = render(
            <Button
                {...props}
            />,
        )
        const button = container.firstElementChild as HTMLButtonElement;
        fireEvent.click(button);
        expect(OnClick).toHaveBeenCalledTimes(1);
    });
});
