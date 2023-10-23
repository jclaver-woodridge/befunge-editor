import React, { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeTile } from './BefungeTile';
import { CodeModifyAction } from 'providers/CodeProvider';

describe('the tile display', () => {
    test('should show the given value as an ASCII character', () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <BefungeTile
                row={1}
                col={1}
                val={"a"}
                status={"none"}
                tileRef={ref}
                codeDispatch={() => {}}
                moveDispatch={() => {}}
            />
        );

        expect(screen.getByDisplayValue("a")).toBeInTheDocument();
    });
});

describe('the tile input', () => {
    let codeMock: jest.Mock;
    let moveMock: jest.Mock;
    beforeEach(async () => {
        codeMock = jest.fn((codeModify: CodeModifyAction) => {});
        moveMock = jest.fn((targetRow: number, targetCol: number) => {});
        const ref = createRef<HTMLInputElement>();
        render(
            <BefungeTile
                row={2}
                col={1}
                val={"a"}
                status={"none"}
                tileRef={ref}
                codeDispatch={codeMock}
                moveDispatch={moveMock}
            />
        );

        await waitFor(() => screen.findByDisplayValue("a"));
    });

    test('should dispatch code changes when the user inputs into it', () => {
        const inputElem = screen.getByDisplayValue("a");
        fireEvent.input(inputElem, {target: {value: "ab"}});

        expect(codeMock).toHaveBeenCalledWith({type: "set", row: 2, col: 1, val: "ab"});
    });

    test('should dispatch movements when the user presses arrow keys in it', () => {
        const keys = [
            {key: "ArrowUp", row: 1, col: 1},
            {key: "ArrowDown", row: 3, col: 1},
            {key: "ArrowLeft", row: 2, col: 0},
            {key: "ArrowRight", row: 2, col: 2}
        ];

        const inputElem = screen.getByDisplayValue("a");
        keys.forEach(currKey => {
            moveMock.mockReset();

            fireEvent.keyDown(inputElem, {key: currKey.key});

            expect(moveMock).toHaveBeenCalledTimes(1);
            expect(moveMock).toHaveBeenCalledWith(currKey.row, currKey.col);
        });
    });

    test('should not dispatch movements for other key presses', () => {
        const inputElem = screen.getByDisplayValue("a");
        fireEvent.keyDown(inputElem, {key: "c"});

        expect(moveMock).toHaveBeenCalledTimes(0);
    });
});