import React, { ChangeEvent, useCallback } from 'react';
import styles from './BefungeTile.module.scss';
import classNames from 'classnames';
import { CodeModifyAction } from 'providers/BefungeProvider';

export interface TileProps {
    val: string;
    status: "none" | "hover";
    row: number;
    col: number;
    codeDispatch: React.Dispatch<CodeModifyAction>;
}

const BefungeTile : React.FC<TileProps> = React.memo((props) => {
    let statusClass = "";
    switch (props.status) {
        case "none":
            statusClass = styles["highlight-none"];
            break;
        case "hover":
            statusClass = styles["highlight-hover"];
            break;
    }

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.codeDispatch({
            type: "set",
            row: props.row,
            col: props.col,
            val: event.target.value
        });
    }, [props]);

    return (
        <div className={classNames(styles.tile, statusClass)}>
            <input
                value={props.val}
                type="text"
                onChange={onChange}
            />
        </div>
    );
});

BefungeTile.displayName = "BefungeTile";

export { BefungeTile };