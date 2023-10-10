import { useOutputContext } from 'providers/OutputProvider';
import React, { useCallback } from 'react';
import styles from './BefungeOutput.module.scss';
import { StyledProps } from 'types/StyledProps';
import classNames from 'classnames';

export const BefungeOutput: React.FC<StyledProps> = (props) => {
    const {output, outputDispatch} = useOutputContext();

    const clearClickHandler = useCallback(() => {
        outputDispatch({type: "clear", val: ""});
    }, [outputDispatch]);

    return (
        <div className={classNames(styles.outputbox, props.className)}>
            <h2>Output:</h2>
            <p>
                {output}
            </p>

            <button
                className={styles.clearbutton}
                onClick={clearClickHandler}
            >
                Clear
            </button>
        </div>
    )
}