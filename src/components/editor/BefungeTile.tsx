import React, { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import styles from './BefungeTile.module.scss';
import classNames from 'classnames';
import { CodeModifyAction } from 'providers/CodeProvider';

export interface TileProps {
    val: string;
    status: "none" | "hover";
    row: number;
    col: number;
    tileRef: React.RefObject<HTMLInputElement> | null;
    codeDispatch: React.Dispatch<CodeModifyAction>;
    moveDispatch: (targetRow: number, targetCol: number) => void;
}

const BefungeTile : React.FC<TileProps> = React.memo((props) => {
    const { val, status, row, col, tileRef, codeDispatch, moveDispatch } = props;
    let statusClass = "";
    switch (status) {
        case "hover":
            statusClass = styles["highlight-hover"];
            break;
        default: break;
    }

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        codeDispatch({
            type: "set",
            row: row,
            col: col,
            val: event.target.value
        });
    }, [codeDispatch, row, col]);

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        // looking for arrow key movement
        let targetRow = row;
        let targetCol = col;
        switch (event.key) {
            case "ArrowUp": targetRow--; break;
            case "ArrowDown": targetRow++; break;
            case "ArrowLeft": targetCol--; break;
            case "ArrowRight": targetCol++; break;
            default: return; // exit early if not an arrow-key press
        }

        // applying arrow key movement
        moveDispatch(targetRow, targetCol);
    }, [moveDispatch, row, col]);

    return (
        <div className={classNames(styles.tile, statusClass)}>
            <input
                value={val}
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={tileRef}
            />
        </div>
    );
});

BefungeTile.displayName = "BefungeTile";

export { BefungeTile };