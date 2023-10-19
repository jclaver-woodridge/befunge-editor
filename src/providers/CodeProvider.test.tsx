import React from 'react';
import * as CodeContext from './CodeProvider';

describe('cleanActionVal', () => {
    test('should default to a single space for a null new value', () => {
        expect(CodeContext.cleanActionVal(null, "a")).toEqual(" ");
    });

    test('should default to a single space for an empty new value', () => {
        expect(CodeContext.cleanActionVal("", "a")).toEqual(" ");
    });

    test('should remove an old value from the front', () => {
        expect(CodeContext.cleanActionVal("ab", "a")).toEqual("b");
    });

    test('should remove an old value from the back', () => {
        expect(CodeContext.cleanActionVal("ab", "b")).toEqual("a");
    });
});

describe('codeReducer', () => {
    beforeEach(() => {
        jest.spyOn(CodeContext, "cleanActionVal")
            .mockImplementation((val: string | null) => {
                if (typeof val === "string") {
                    return val;
                } else {
                    return " ";
                }
            });
    });

    test('should correctly modify code', () => {
        const code = [
            ["a", "b", "c"],
            ["d", "e", "f"],
            ["g", "h", "i"],
        ];

        const newCode = CodeContext.codeReducer(code, {type: "set", row: 1, col: 2, val: "z"});
        expect(newCode).toEqual([
            ["a", "b", "c"],
            ["d", "e", "z"],
            ["g", "h", "i"],
        ]);
    });
});