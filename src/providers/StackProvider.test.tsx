import React from 'react';
import { stackReducer } from './StackProvider';

describe('the stack reducer', () => {
    test('should correctly push to the stack', () => {
        expect(
            stackReducer([1, 2, 4], {type: "push", val: 8})
        ).toEqual([1, 2, 4, 8]);
    });

    test('should correctly pop from the stack', () => {
        expect(
            stackReducer([7, 6, 5, 1, 2, 3, 4], {type: "pop", val: 0})
        ).toEqual([7, 6, 5, 1, 2, 3]);
    });

    test('should not modify the original passed stack', () => {
        const stack = [8, 6, 4, 2];
        const newStack = stackReducer(stack, {type: "push", val: 0});

        expect(stack).toEqual([8, 6, 4, 2]);
    });
});