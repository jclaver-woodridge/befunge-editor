import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeEditor } from './BefungeEditor';
import { mockUseCodeContext } from 'test/mocks/mockUseCodeContext';
import userEvent from '@testing-library/user-event';

describe('the editor display', () => {
    test('has one befunge tile for every character of code', () => {
        mockUseCodeContext({
            code: [
                ['a', 'a', 'a'],
                ['a', 'b', 'b'],
                ['a', 'b', 'c']
            ],
            codeDispatch: () => {},
            cursor: [0, 0]
        });

        renderBefungeEditor();

        expect(screen.getAllByDisplayValue("a")).toHaveLength(5);
        expect(screen.getAllByDisplayValue("b")).toHaveLength(3);
        expect(screen.getAllByDisplayValue("c")).toHaveLength(1);
    });
});

describe('the move dispatch', () => {
    beforeEach(() => {
        mockUseCodeContext({
            code: [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
                ['g', 'h', 'i']
            ],
            codeDispatch: () => {},
            cursor: [0, 0]
        });
    });

    test('should try to focus into the input at the target coordinates', async () => {
        const user = renderBefungeEditor();

        const startInput = screen.getByDisplayValue("e");
        await user.click(startInput);
        await user.keyboard("{ArrowRight}");

        expect(startInput).not.toHaveFocus();
        const endInput = screen.getByDisplayValue("f");
        expect(endInput).toHaveFocus();
    });

    test('should properly bound the given coordinates', async () => {
        const user = renderBefungeEditor();

        const keys = [
            {start: "a", key: "ArrowLeft", end: "c"},
            {start: "b", key: "ArrowUp", end: "h"},
            {start: "i", key: "ArrowDown", end: "c"},
            {start: "f", key: "ArrowRight", end: "d"}
        ];

        for (let i = 0; i < keys.length; i++) {
            const currKey = keys[i];

            const startInput = screen.getByDisplayValue(currKey.start);
            await user.click(startInput);
            await user.keyboard(`{${currKey.key}}`);

            expect(startInput).not.toHaveFocus();
            const endInput = screen.getByDisplayValue(currKey.end);
            expect(endInput).toHaveFocus();
        };
    });
});

function renderBefungeEditor() {
    const user = userEvent.setup();

    render(<BefungeEditor/>);

    return user;
}