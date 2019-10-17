import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../../theme";
import { Button } from "../Button"
import { ButtonType } from "../../";

describe("Tests for the Button component", () => {
    const caption = "BUTTON_CAPTION";
    const onClick = jest.fn();
    const emphasis: emphasisType = "Primary";
    const type: ButtonType = "button";

    const props = {
        caption, onClick, emphasis, type,
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
        expect(getByText(caption)).toBeDefined();
    });

    test("Emphasis style is applied correctly", () => {
        const { getByText } = render(
            <Button
                {...props}
            />,
        )
        const button = getByText(props.caption);
        expect(button).toHaveStyle(`background-color: ${backgroundColor[emphasis]}; color: ${fontColor[emphasis]}`);

        fireEvent.mouseOver(button);
        expect(button).toHaveStyle(`background-color: ${hoverBackgroundColor[emphasis]}`);
    });

    test("onClick event fires correctly", () => {
        const { getByText } = render(
            <Button
                {...props}
            />,
        )
        const button = getByText(props.caption);
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
