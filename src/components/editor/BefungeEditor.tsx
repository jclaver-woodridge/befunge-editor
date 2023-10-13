import React from 'react';
import { BefungeTile } from './BefungeTile';
import styles from './BefungeEditor.module.scss';
import { useCodeContext } from 'providers/CodeProvider';

export const BefungeEditor: React.FC = () => {
    const { code, codeDispatch, cursor } = useCodeContext();

    return (
        <div className={styles.editor}>
            {code.map((row, rowInd) => {
                return (<div key={rowInd} className={styles["editor-row"]}>
                    <div className={styles["row-inner"]}>
                        {row.map((col, colInd) => (
                            <BefungeTile
                                key={rowInd + "," + colInd}
                                val={code[rowInd][colInd]}
                                status={cursor[0] == colInd && cursor[1] == rowInd ? "hover" : "none"}
                                row={rowInd}
                                col={colInd}
                                codeDispatch={codeDispatch}
                            />
                        ))}
                    </div>
                </div>)
            })}
        </div>
    )
};