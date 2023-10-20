import React, { useCallback } from 'react';
import styles from './MenuBar.module.scss';
import { useCodeContext } from 'providers/CodeProvider';
import { downloadBefungeFile } from 'utils/FileUtils';

export const MenuBar: React.FC = () => {
    const { code, clearCode } = useCodeContext();

    const save = useCallback(() => {
        downloadBefungeFile(
            "befungeprogram.txt",
            code
        );
    }, [code]);

    return (
        <div className={styles.menubar}>
            <button onClick={save}>Save</button>
            <button>Load</button>
            <button onClick={clearCode}>Clear</button>
        </div>
    );
}