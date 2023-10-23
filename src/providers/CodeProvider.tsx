import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { createInitialCode, useBefungeContext } from './BefungeProvider';
import { padBefungeProgram } from 'utils/FileUtils';

export interface CodeSetAction {
    type: "set";
    col: number;
    row: number;
    val: string;
}

export interface CodeClearAction {
    type: "clear";
}

export interface CodeAllSetAction {
    type: "allset";
    newCode: string[][];
}

export type CodeModifyAction = CodeSetAction | CodeClearAction | CodeAllSetAction;

export function cleanActionVal(val: string, cell: string) {
    if (val.length < 1) {return " "}

    if (val.length > 1) {
        const newVal = val.replace(cell, "");
        if (newVal.length < 1) {
            return " ";
        } else {
            return newVal[0];
        }
    }

    return val;
}

export function codeReducer(code: string[][], action: CodeModifyAction) {
    if (action.type == "set") {
        action.val = cleanActionVal(action.val, code[action.row][action.col]);

        const newCode = [...code];
        newCode[action.row][action.col] = action.val;
        return newCode;
    } else if (action.type == "allset") {
        return padBefungeProgram(action.newCode, 80, 25);
    } else {
        const newCode = [];
        for (let row = 0; row < code.length; row++) {
            newCode.push(new Array(code[row].length).fill(" "));
        }
        return newCode;
    }
}

export interface ICodeContext {
    code: string[][];
    codeDispatch: React.Dispatch<CodeModifyAction>;
    cursor: [number, number];
}

const CodeContext = createContext<ICodeContext>({
    code: [[]],
    codeDispatch: () => {},
    cursor: [0, 0]
});

export const useCodeContext = () => useContext(CodeContext);

export const CodeProvider: React.FC<PropsWithChildren> = (props) => {
    const [code, codeDispatch] = useReducer(codeReducer, null, createInitialCode);
    const [cursor, setCursor] = useState<[number, number]>([0, 0]);

    const { befungeInterpreter } = useBefungeContext();
    useEffect(() => {

    }, [befungeInterpreter]);

    const interpCodeDispatch = useCallback((c: CodeModifyAction) => {
        if (c.type == "set") {
            befungeInterpreter.setAt(
                c.col,
                c.row,
                cleanActionVal(c.val, befungeInterpreter.getAt(c.col, c.row)),
                true
            );
        } else if (c.type == "allset") {
            befungeInterpreter.setProgramWithSize(c.newCode, 80, 25);
        } else {
            befungeInterpreter.clear();
        }
        codeDispatch(c);
    }, [codeDispatch, befungeInterpreter]);

    useEffect(() => {
        befungeInterpreter.setCursorCallback((x: number, y: number) => {
            setCursor([x, y]);
        });
        befungeInterpreter.setSetCallback((x: number, y: number, v: string) => {
            codeDispatch({type: "set", col: x, row: y, val: v});
        });
    }, [befungeInterpreter, setCursor, codeDispatch]);

    const codeProviderValue: ICodeContext = useMemo(
        () => ({code, codeDispatch: interpCodeDispatch, cursor}),
        [code, interpCodeDispatch, cursor]
    );

    return (
        <CodeContext.Provider value={codeProviderValue}>
            {props.children}
        </CodeContext.Provider>
    );
}