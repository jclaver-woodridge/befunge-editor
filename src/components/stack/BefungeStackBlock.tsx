import React from 'react';
import styles from './BefungeStackBlock.module.scss';

export interface StackBlockProps {
    key: number;
    val: number;
}

export const BefungeStackBlock: React.FC<StackBlockProps> = (props) => {
    let asciiText = "";
    if (props.val >= 32 && props.val < 65536) {
        asciiText = `(${String.fromCharCode(props.val)})`;
    }

    return (
        <div className={styles.stackblock}>
            {props.val}
            <div className={styles.asciitext}>
                {asciiText}
            </div>
        </div>
    );
}