import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeOutput } from './BefungeOutput';
import { mockUseOutputContext } from 'test/mocks/mockUseOutputContext';

describe('the output display', () => {
    test('will display the output it\'s provided', () => {
        mockUseOutputContext({
            output: "abc, cool output here!"
        });

        render(<BefungeOutput/>);

        expect(screen.getByText("abc, cool output here!")).toBeInTheDocument();
    });

    test('will clear the output when the clear button is pressed', () => {
        const outputDispatch = jest.fn();
        mockUseOutputContext({outputDispatch});

        render(<BefungeOutput/>);

        const clearButton = screen.getByRole("button");
        fireEvent.click(clearButton);

        expect(outputDispatch).toHaveBeenCalledTimes(1);
        expect(outputDispatch).toHaveBeenCalledWith({type: "clear", val: ""});
    });
});