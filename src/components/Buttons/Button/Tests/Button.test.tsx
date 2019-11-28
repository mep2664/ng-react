import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { emphasisType, bgColor, fontColor, hoverBgColor } from "../../../../theme";
import { Button } from "../Button"
import { ButtonType } from "../../";

describe("Tests for the Button component", () => {
    const caption = "BUTTON_CAPTION";
    const onClick = jest.fn();
    const emphasis: emphasisType = "Secondary";
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
