import { BefungeEditor } from 'components/editor/BefungeEditor';
import React from 'react';
import styles from './Home.module.scss';
import { BefungeOutput } from 'components/output/BefungeOutput';
import { BefungeController } from 'components/controls/BefungeController';
import { BefungeStack } from 'components/stack/BefungeStack';
import { MenuBar } from 'components/menubar/MenuBar';

export const Home: React.FC = () => {
    return (
        <>
            <div className={styles["home-container"]}>
                <MenuBar />
                <BefungeEditor />
            </div>
            <div className={styles["control-output-outer"]}>
                <div className={styles["control-output-container"]}>
                    <BefungeController className={styles.control}/>
                    <BefungeOutput className={styles.output}/>
                    <BefungeStack className={styles.stack}/>
                </div>
            </div>
        </>
    )
};