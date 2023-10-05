import React, { useReducer } from 'react';
import { BefungeTile } from './BefungeTile';
import styles from './BefungeEditor.module.scss';

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

export const BefungeEditor: React.FC = () => {
    const [code, codeDispatch] = useReducer(codeReducer, null, () => {
        const res = [];
        for (let i = 0; i < 20; i++) {
            res.push(new Array(60).fill(" "));
        }
        return res;
    });

    return (
        <div className={styles.editor}>
            {code.map((row, rowInd) => {
                return (<div key={rowInd}>
                    {row.map((col, colInd) => (
                        <BefungeTile
                            key={rowInd + "," + colInd}
                            val={code[rowInd][colInd]}
                            status="none"
                            row={rowInd}
                            col={colInd}
                            codeDispatch={codeDispatch}
                        />
                    ))}
                </div>)
            })}
        </div>
    )
};