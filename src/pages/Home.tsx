import { BefungeEditor } from 'components/editor/BefungeEditor';
import React from 'react';
import styles from './Home.module.scss';
import { BefungeOutput } from 'components/output/BefungeOutput';
import { BefungeRunner } from 'components/controls/BefungeRunner';

export const Home: React.FC = () => {
    return (
        <div className={styles["home-container"]}>
            <h1>Welcome to the Befunge Editor!</h1>
            <BefungeEditor />
            <div className={styles["control-output-container"]}>
                <BefungeRunner className={styles.control}/>
                <BefungeOutput className={styles.output}/>
            </div>
        </div>
    )
};