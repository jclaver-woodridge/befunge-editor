import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as CodeContext from 'providers/CodeProvider';
import { BefungeEditor } from './BefungeEditor';

describe('the editor display', () => {
    test('has one befunge tile for every character of code', () => {
        jest.spyOn(CodeContext, "useCodeContext")
            .mockImplementation(() => ({
                code: [
                    ['a', 'a', 'a'],
                    ['a', 'b', 'b'],
                    ['a', 'b', 'c']
                ],
                codeDispatch: () => {},
                cursor: [0, 0]
            }));

        render(<BefungeEditor/>);

        expect(screen.getAllByDisplayValue("a")).toHaveLength(5);
        expect(screen.getAllByDisplayValue("b")).toHaveLength(3);
        expect(screen.getAllByDisplayValue("c")).toHaveLength(1);
    });
});

describe('the move dispatch', () => {
    beforeEach(() => {
        jest.spyOn(CodeContext, "useCodeContext")
            .mockImplementation(() => ({
                code: [
                    ['a', 'b', 'c'],
                    ['d', 'e', 'f'],
                    ['g', 'h', 'i']
                ],
                codeDispatch: () => {},
                cursor: [0, 0]
            }));

        render(<BefungeEditor/>);
    });

    test('should try to focus into the input at the target coordinates', () => {
        const startInput = screen.getByDisplayValue("e");
        fireEvent.keyDown(startInput, {key: "ArrowRight"});
        expect(startInput).not.toHaveFocus();

        const endInput = screen.getByDisplayValue("f");
        expect(endInput).toHaveFocus();
    });

    test('should properly bound the given coordinates', () => {
        const keys = [
            {start: "a", key: "ArrowLeft", end: "c"},
            {start: "b", key: "ArrowUp", end: "h"},
            {start: "i", key: "ArrowDown", end: "c"},
            {start: "f", key: "ArrowRight", end: "d"}
        ];

        keys.forEach(currKey => {
            const startInput = screen.getByDisplayValue(currKey.start);
            fireEvent.keyDown(startInput, {key: currKey.key});
            expect(startInput).not.toHaveFocus();

            const endInput = screen.getByDisplayValue(currKey.end);
            expect(endInput).toHaveFocus();
        });
    });
});