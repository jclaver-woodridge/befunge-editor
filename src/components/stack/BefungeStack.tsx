import React from 'react';
import { StyledProps } from 'types/StyledProps';
import styles from './BefungeStack.module.scss';
import classNames from 'classnames';
import { useStackContext } from 'providers/StackProvider';

export const BefungeStack: React.FC<StyledProps> = (props) => {
    const { stack } = useStackContext();

    return (
        <div className={classNames(styles["stack-cont"], props.className)}>
            <h2>Stack</h2>
            <div className={styles["stack-val-cont"]}>
                {stack.map((val, ind) => (
                    <div key={ind}>
                        {val}
                    </div>
                ))}
            </div>
        </div>
    );
}