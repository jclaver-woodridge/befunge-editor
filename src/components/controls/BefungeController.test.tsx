import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as ControlContext from "providers/ControlProvider";
import { BefungeController, controllerSpeeds } from './BefungeController';

let toggleStart: jest.Mock;
let reset: jest.Mock;
let setSpeed: jest.Mock;
beforeEach(() => {
    toggleStart = jest.fn(() => {});
    reset = jest.fn(() => {});
    setSpeed = jest.fn(() => {});

    jest.spyOn(ControlContext, "useControlContext")
        .mockImplementation(() => ({
            isStart: false,
            toggleStart,
            reset,
            speed: 250,
            setSpeed
        }));
});

describe('the start/stop button', () => {
    test('should fire a start/stop toggle on press', () => {
        render(<BefungeController/>);

        const startButton = screen.getAllByRole("button")[0];
        fireEvent.click(startButton);

        expect(toggleStart).toHaveBeenCalledTimes(1);
    });

    test('should display start if the code is not running', () => {
        render(<BefungeController/>);

        const startButton = screen.getAllByRole("button")[0];
        expect(startButton).toHaveTextContent(/start/i);
    });

    test('should display stop if the code is running', () => {
        jest.spyOn(ControlContext, "useControlContext")
            .mockImplementation(() => ({
                isStart: true,
                toggleStart,
                reset,
                speed: 250,
                setSpeed
            }));

        render(<BefungeController/>);

        const startButton = screen.getAllByRole("button")[0];
        expect(startButton).toHaveTextContent(/stop/i);
    });
});

describe('the reset button', () => {
    test('should fire a reset on press', () => {
        render(<BefungeController/>);

        const resetButton = screen.getAllByRole("button")[1];
        fireEvent.click(resetButton);

        expect(reset).toHaveBeenCalledTimes(1);
    });
});

describe('the speed controls', () => {
    test('should have one radio button for each speed', () => {
        render(<BefungeController/>);

        controllerSpeeds.forEach(speed => {
            const speedRegex = new RegExp((1000 / speed).toString(), "i");

            expect(screen.getByLabelText(speedRegex)).toBeInTheDocument();
        });
    });

    test('should only have the chosen speed selected', () => {
        render(<BefungeController/>);

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

    test('should fire a speed change on press', () => {
        render(<BefungeController/>);

        const speedElem = screen.getByLabelText("2 instr/sec");
        fireEvent.click(speedElem);

        expect(setSpeed).toHaveBeenCalledTimes(1);
        expect(setSpeed).toHaveBeenCalledWith(500);
    });
});