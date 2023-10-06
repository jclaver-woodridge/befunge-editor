import React, { PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react';

export interface CodeModifyAction {
    type: "set" | "unset",
    col: number,
    row: number,
    val: string | null
}

function codeReducer(code: string[][], action: CodeModifyAction) {
    if (!action.val) {
        action.val = " ";
    }

    if (action.val.length > 1) {
        action.val = action.val.replace(code[action.row][action.col], "");
    }

    const newCode = [...code];
    switch (action.type) {
        case "set":
            if (action.val != null)
                newCode[action.row][action.col] = action.val;
            else
                newCode[action.row][action.col] = " ";
            break;
        case "unset":
            newCode[action.row][action.col] = " ";
    }
    return newCode;
}

export interface IBefungeContext {
    code: string[][];
    codeDispatch: React.Dispatch<CodeModifyAction>;
}

const BefungeContext = createContext<IBefungeContext>({
    code: [[]],
    codeDispatch: () => {}
});

export const useBefungeContext = () => useContext(BefungeContext);

export const BefungeProvider: React.FC<PropsWithChildren> = (props) => {
    const [code, codeDispatch] = useReducer(codeReducer, null, () => {
        const res = [];
        for (let i = 0; i < 20; i++) {
            res.push(new Array(60).fill(" "));
        }
        return res;
    });

    const providerValue: IBefungeContext = useMemo(
        () => ({code, codeDispatch}),
        [code, codeDispatch]
    );

    return (
        <BefungeContext.Provider value={providerValue}>
            {props.children}
        </BefungeContext.Provider>
    )
}