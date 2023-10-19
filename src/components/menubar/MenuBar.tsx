import React from 'react';
import styles from './MenuBar.module.scss';
import { useCodeContext } from 'providers/CodeProvider';

export const MenuBar: React.FC = () => {
    let { clearCode } = useCodeContext();

    return (
        <div className={styles.menubar}>
            <button>Save</button>
            <button>Load</button>
            <button onClick={clearCode}>Clear</button>
        </div>
    );
}