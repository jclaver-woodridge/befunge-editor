import React from 'react';
import { StyledProps } from 'types/StyledProps';
import styles from './BefungeStack.module.scss';
import classNames from 'classnames';
import { useStackContext } from 'providers/StackProvider';
import { BefungeStackBlock } from './BefungeStackBlock';

export const BefungeStack: React.FC<StyledProps> = (props) => {
    const { stack } = useStackContext();

    return (
        <div className={classNames(styles["stack-cont"], props.className)}>
            <h2>Stack:</h2>
            <div className={styles["stack-val-cont"]}>
                {stack.map((val, ind) => (
                    <BefungeStackBlock key={ind} val={val}/>
                ))}
            </div>
        </div>
    );
}