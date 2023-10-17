import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as StackContext from 'providers/StackProvider';
import { BefungeStack } from './BefungeStack';

describe('the stack display', () => {
    const stackVal = [1, 97, 3, 65, 5, 10];
    beforeEach(() => {
        jest.spyOn(StackContext, "useStackContext")
            .mockImplementation(() => ({
                stack: stackVal,
                stackDispatch: () => {}
            }));

        render(<BefungeStack/>);
    });

    test('should show each of the numbers in the stack', () => {
        stackVal.forEach(n => {
            expect(screen.getByText(n.toString())).toBeInTheDocument();
        });
    });
});