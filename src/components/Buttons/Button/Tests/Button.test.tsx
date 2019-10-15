import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import { emphasisType, backgroundColor, fontColor, hoverBackgroundColor } from "../../../../theme";
import { Button } from "../Button"

describe("Tests for the Button component", () => {
    const caption = "BUTTON_CAPTION";
    const onClick = jest.fn();
    const emphasis: emphasisType = "Primary";

    test("Component matches snapshot", () => {
        const { container } = render(
            <Button
                Caption={caption}
                Type="button"
                Emphasis={emphasis}
                OnClick={onClick}
            />,
        );
        expect(container).toMatchSnapshot();
    });

    test("Button exists", () => {
        const { queryByText } = render(
            <Button
                Caption={caption}
                Type="button"
                Emphasis={emphasis}
                OnClick={onClick}
            />,
        )
        expect(queryByText(caption)).toBeDefined();
    });

    test("Emphasis style is applied correctly", () => {
        const { container } = render(
            <Button
                Caption={caption}
                Type="button"
                Emphasis={emphasis}
                OnClick={onClick}
            />,
        )
        const button = container.firstElementChild as HTMLElement;
        expect(button).toHaveStyle(`background-color: ${backgroundColor[emphasis]}; color: ${fontColor[emphasis]}`);

        fireEvent.mouseOver(button);
        expect(button).toHaveStyle(`background-color: ${hoverBackgroundColor[emphasis]}`);
    });

    test("onClick event fires correctly", () => {
        const { container } = render(
            <Button
                Caption={caption}
                Type="button"
                Emphasis={emphasis}
                OnClick={onClick}
            />,
        )
        const button = container.firstElementChild as HTMLButtonElement;
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
