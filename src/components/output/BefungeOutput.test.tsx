import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as OutputContext from 'providers/OutputProvider';
import { BefungeOutput } from './BefungeOutput';

describe('the output display', () => {
    let outputDispatch: jest.Mock;
    beforeEach(() => {
        outputDispatch = jest.fn(() => {});

        jest.spyOn(OutputContext, 'useOutputContext')
            .mockImplementation(() => ({
                output: "abc, cool output here!",
                outputDispatch
            }));

        render(<BefungeOutput/>);
    });

    test('will display the output it\'s provided', () => {
        expect(screen.getByText("abc, cool output here!")).toBeInTheDocument();
    });

    test('will clear the output when the clear button is pressed', () => {
        const clearButton = screen.getByRole("button");
        fireEvent.click(clearButton);

        expect(outputDispatch).toHaveBeenCalledTimes(1);
        expect(outputDispatch).toHaveBeenCalledWith({type: "clear", val: ""});
    });
});