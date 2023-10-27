import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeTile, TileProps } from './BefungeTile';
import userEvent from '@testing-library/user-event';

describe('the tile display', () => {
    test('should show the given value as an ASCII character', () => {
        renderBefungeTile({val: "a"});

        expect(screen.getByDisplayValue("a")).toBeInTheDocument();
    });
});

describe('the tile input', () => {
    test('should dispatch code changes when the user inputs into it', async () => {
        const codeDispatch = jest.fn();
        const user = renderBefungeTile({
            val: "a",
            row: 2,
            col: 1,
            codeDispatch
        });

        const inputElem = screen.getByDisplayValue("a");
        await user.click(inputElem);
        await user.keyboard("{b}");

        expect(codeDispatch).toHaveBeenCalledWith({type: "set", row: 2, col: 1, val: "ab"});
    });

    test('should dispatch movements when the user presses arrow keys in it', async () => {
        const keys = [
            {key: "ArrowUp", row: 1, col: 1},
            {key: "ArrowDown", row: 3, col: 1},
            {key: "ArrowLeft", row: 2, col: 0},
            {key: "ArrowRight", row: 2, col: 2}
        ];

        const moveDispatch = jest.fn();
        const user = renderBefungeTile({
            val: "a",
            row: 2,
            col: 1,
            moveDispatch
        });

        const inputElem = screen.getByDisplayValue("a");
        for (let i = 0; i < keys.length; i++) {
            const currKey = keys[i];

            moveDispatch.mockReset();

            await user.click(inputElem);
            await user.keyboard(`{${currKey.key}}`);

            expect(moveDispatch).toHaveBeenCalledTimes(1);
            expect(moveDispatch).toHaveBeenCalledWith(currKey.row, currKey.col);
        };
    });

    test('should not dispatch movements for other key presses', async () => {
        const moveDispatch = jest.fn();
        const user = renderBefungeTile({
            val: "a",
            moveDispatch
        })

        const inputElem = screen.getByDisplayValue("a");
        await user.click(inputElem);
        await user.keyboard("{c}");

        expect(moveDispatch).toHaveBeenCalledTimes(0);
    });
});

function renderBefungeTile(props?: Partial<TileProps>) {
    const user = userEvent.setup();

    render(<BefungeTile
        row = {props?.row ?? 0}
        col = {props?.col ?? 0}
        val = {props?.val ?? " "}
        status = {props?.status ?? "none"}
        tileRef = {props?.tileRef ?? createRef<HTMLInputElement>()}
        codeDispatch = {props?.codeDispatch ?? (() => {})}
        moveDispatch = {props?.moveDispatch ?? (() => {})}
    />);

    return user;
}