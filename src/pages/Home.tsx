import { BefungeEditor } from 'components/editor/BefungeEditor';
import React from 'react';
import styles from './Home.module.scss';
import { BefungeOutput } from 'components/output/BefungeOutput';
import { BefungeRunner } from 'components/controls/BefungeRunner';
import { BefungeStack } from 'components/stack/BefungeStack';

export const Home: React.FC = () => {
    return (
        <>
            <div className={styles["home-container"]}>
                <BefungeEditor />
            </div>
            <div className={styles["control-output-outer"]}>
                <div className={styles["control-output-container"]}>
                    <BefungeRunner className={styles.control}/>
                    <BefungeOutput className={styles.output}/>
                    <BefungeStack className={styles.stack}/>
                </div>
            </div>
        </>
    )
};