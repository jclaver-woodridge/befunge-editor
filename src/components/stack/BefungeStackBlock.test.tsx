import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BefungeStackBlock } from './BefungeStackBlock';

describe('the stack blocks', () => {
    test('should display the number value they are given', () => {
        const vals = [
            0,
            1,
            10,
            100,
            234,
            876543,
            -1239847
        ];

        vals.forEach(val => {
            render(<BefungeStackBlock val={val} key={0}/>);

            expect(screen.getByText(val.toString())).toBeInTheDocument();
        });
    });

    test('should display the given value as ascii if in a valid range', () => {
        const validPairs = [
            {val: 65, char: "A"},
            {val: 9978, char: "⛺"},
            {val: 960, char: "π"},
            {val: 64967, char: "ﷇ"}
        ];

        validPairs.forEach(pair => {
            render(<BefungeStackBlock val={pair.val} key={0}/>);

            expect(screen.getByText(new RegExp(pair.char, "i"))).toBeInTheDocument();
        });
    });

    test('should not display the value as ascii if not in a valid range', () => {
        const invalidVals = [
            0,
            10,
            31,
            100000,
            192834788712348717234
        ];

        invalidVals.forEach(val => {
            render(<BefungeStackBlock val={val} key={0}/>);

            // ascii chars are rendered with parens; should not be present for invalid chars
            expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
        });
    });
});