import React, { createRef, useCallback, useEffect, useState } from 'react';
import { BefungeTile } from './BefungeTile';
import styles from './BefungeEditor.module.scss';
import { useCodeContext } from 'providers/CodeProvider';

export const BefungeEditor: React.FC = () => {
    const { code, codeDispatch, cursor } = useCodeContext();
    const [tileRefs, setTileRefs] = useState<React.RefObject<HTMLInputElement>[][]>([[]]);

    const codeHeight = code.length;
    const codeWidth = code[0].length;

    const moveDispatch = useCallback((targetRow: number, targetCol: number) => {
        // bounding target position
        if (targetRow >= codeHeight) {targetRow = targetRow % codeHeight;}
        if (targetRow < 0) {targetRow = (targetRow % codeHeight) + codeHeight;}
        if (targetCol >= codeWidth) {targetCol = targetCol % codeWidth;}
        if (targetCol < 0) {targetCol = (targetCol % codeWidth) + codeWidth;}

        // moving to that position
        tileRefs[targetRow][targetCol].current?.focus();
    }, [codeHeight, codeWidth, tileRefs]);

    useEffect(() => {
        setTileRefs((tileRefs) => {
            return new Array(codeHeight)
                .fill(null)
                .map((_, i) => {
                    return new Array(codeWidth)
                        .fill(null)
                        .map((_, j) => (
                            i < tileRefs.length && j < tileRefs[0].length)
                                ? tileRefs[i][j]
                                : createRef()
                        );
                });
        });
    }, [codeHeight, codeWidth, setTileRefs]);

    return (
        <div className={styles.editor}>
            {code.map((row, rowInd) => {
                return (<div key={rowInd} className={styles["editor-row"]}>
                    <div className={styles["row-inner"]}>
                        {row.map((col, colInd) => {
                            const tileRef = (
                                rowInd < tileRefs.length && colInd < tileRefs[0].length
                                    ? tileRefs[rowInd][colInd]
                                    : null
                            );

                            return (
                                <BefungeTile
                                    key={rowInd + "," + colInd}
                                    val={code[rowInd][colInd]}
                                    status={cursor[0] == colInd && cursor[1] == rowInd ? "hover" : "none"}
                                    row={rowInd}
                                    col={colInd}
                                    tileRef={tileRef}
                                    codeDispatch={codeDispatch}
                                    moveDispatch={moveDispatch}
                                />
                            );
                        })}
                    </div>
                </div>)
            })}
        </div>
    )
};