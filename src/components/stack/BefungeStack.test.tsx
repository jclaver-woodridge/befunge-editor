import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeStack } from './BefungeStack';
import { mockUseStackContext } from 'test/mocks/mockUseStackContext';

describe('the stack display', () => {
    test('should show each of the numbers in the stack', () => {
        const stack = [1, 97, 3, 65, 5, 10];
        mockUseStackContext({stack});

        render(<BefungeStack/>);

        stack.forEach(n => {
            expect(screen.getByText(n.toString())).toBeInTheDocument();
        });
    });
});