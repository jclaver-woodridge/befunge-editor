import React from 'react';
import { outputReducer } from './OutputProvider';

describe('the output reducer', () => {
    test('should correctly add new output', () => {
        expect(
            outputReducer("abc132", {type: "add", val: " cool addition"})
        ).toEqual("abc132 cool addition");
    });

    test('should correctly clear', () => {
        expect(
            outputReducer("abc111123", {type: "clear", val: "ignore me"})
        ).toEqual("");
    });
});