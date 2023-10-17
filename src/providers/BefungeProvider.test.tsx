import React from 'react';
import { createInitialCode } from "./BefungeProvider";

describe('the initial code creator', () => {
    test('will create a 25x80 grid of spaces', () => {
        const code = createInitialCode();

        expect(code).toHaveLength(25);
        code.forEach(row => {
            expect(row).toHaveLength(80);
            row.forEach(c => {
                expect(c).toEqual(" ");
            });
        });
    });
});