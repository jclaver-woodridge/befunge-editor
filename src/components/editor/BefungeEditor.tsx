import React from 'react';
import { BefungeTile } from './BefungeTile';
import styles from './BefungeEditor.module.scss';
import { useBefungeContext } from 'providers/BefungeProvider';

export const BefungeEditor: React.FC = () => {
    const {code, codeDispatch} = useBefungeContext();

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