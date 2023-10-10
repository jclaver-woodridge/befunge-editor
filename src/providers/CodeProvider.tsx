import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { createInitialCode, useBefungeContext } from './BefungeProvider';

export interface CodeModifyAction {
    col: number;
    row: number;
    val: string | null;
}

export function cleanActionVal(val: string | null, cell: string) {
    if (!val) {return " ";}

    if (val.length > 1) {return val.replace(cell, "");}

    return val;
}

export function codeReducer(code: string[][], action: CodeModifyAction) {
    action.val = cleanActionVal(action.val, code[action.row][action.col]);

    const newCode = [...code];
    newCode[action.row][action.col] = action.val;
    return newCode;
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

    const interpCodeDispatch = useCallback((c: CodeModifyAction) => {
        befungeInterpreter.setAt(
            c.col,
            c.row,
            cleanActionVal(c.val, befungeInterpreter.getAt(c.col, c.row)),
            true
        );
        codeDispatch(c);
    }, [codeDispatch, befungeInterpreter]);

    useEffect(() => {
        befungeInterpreter.setCursorCallback((x: number, y: number) => {
            setCursor([x, y]);
        });
        befungeInterpreter.setSetCallback((x: number, y: number, v: string) => {
            codeDispatch({col: x, row: y, val: v});
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