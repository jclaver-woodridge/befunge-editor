import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeOutput } from './BefungeOutput';
import { mockUseOutputContext } from 'test/mocks/mockUseOutputContext';
import userEvent from '@testing-library/user-event';

describe('the output display', () => {
    test('will display the output it\'s provided', () => {
        mockUseOutputContext({
            output: "abc, cool output here!"
        });

        renderBefungeOutput();

        expect(screen.getByText("abc, cool output here!")).toBeInTheDocument();
    });

    test('will clear the output when the clear button is pressed', async () => {
        const outputDispatch = jest.fn();
        mockUseOutputContext({outputDispatch});

        const user = renderBefungeOutput();

        const clearButton = screen.getByRole("button");
        await user.click(clearButton);

        expect(outputDispatch).toHaveBeenCalledTimes(1);
        expect(outputDispatch).toHaveBeenCalledWith({type: "clear", val: ""});
    });
});

function renderBefungeOutput() {
    const user = userEvent.setup();

    render(<BefungeOutput/>);

    return user;
}