import { BefungeEditor } from 'components/editor/BefungeEditor';
import React from 'react';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
    return (
        <div className={styles["home-container"]}>
            <h1>Welcome to the Befunge Editor!</h1>
            <BefungeEditor />
        </div>
    )
};