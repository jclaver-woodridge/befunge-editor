import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeController, controllerSpeeds } from './BefungeController';
import { mockUseControlContext } from 'test/mocks/mockUseControlContext';
import userEvent from '@testing-library/user-event';

describe('the start/stop button', () => {
    test('should fire a start/stop toggle on press', async () => {
        const toggleStart = jest.fn();
        mockUseControlContext({toggleStart});

        const user = renderBefungeController();

        const startButton = screen.getAllByRole("button")[0];
        await user.click(startButton);

        expect(toggleStart).toHaveBeenCalledTimes(1);
    });

    test('should display start if the code is not running', () => {
        mockUseControlContext({
            isStart: false
        });

        renderBefungeController();

        const startButton = screen.getAllByRole("button")[0];
        expect(startButton).toHaveTextContent(/start/i);
    });

    test('should display stop if the code is running', () => {
        mockUseControlContext({
            isStart: true
        });

        renderBefungeController();

        const startButton = screen.getAllByRole("button")[0];
        expect(startButton).toHaveTextContent(/stop/i);
    });
});

describe('the reset button', () => {
    test('should fire a reset on press', async () => {
        const reset = jest.fn();
        mockUseControlContext({reset});

        const user = renderBefungeController();

        const resetButton = screen.getAllByRole("button")[1];
        await user.click(resetButton);

        expect(reset).toHaveBeenCalledTimes(1);
    });
});

describe('the speed controls', () => {
    test('should have one radio button for each speed', () => {
        mockUseControlContext();

        renderBefungeController();

        controllerSpeeds.forEach(speed => {
            const speedRegex = new RegExp((1000 / speed).toString(), "i");

            expect(screen.getByLabelText(speedRegex)).toBeInTheDocument();
        });
    });

    test('should only have the chosen speed selected', () => {
        mockUseControlContext({
            speed: 250
        });

        renderBefungeController();

        controllerSpeeds.forEach(speed => {
            const speedRegex = new RegExp((1000 / speed).toString(), "i");
            const speedElem = screen.getByLabelText(speedRegex);

            if (speed === 250) {
                expect(speedElem).toBeChecked();
            } else {
                expect(speedElem).not.toBeChecked();
            }
        });
    });

    test('should fire a speed change on press', async () => {
        const setSpeed = jest.fn();
        mockUseControlContext({setSpeed});

        const user = renderBefungeController();

        const speedElem = screen.getByLabelText("2 instr/sec");
        await user.click(speedElem);

        expect(setSpeed).toHaveBeenCalledTimes(1);
        expect(setSpeed).toHaveBeenCalledWith(500);
    });
});

function renderBefungeController() {
    const user = userEvent.setup();

    render(<BefungeController/>);

    return user;
}