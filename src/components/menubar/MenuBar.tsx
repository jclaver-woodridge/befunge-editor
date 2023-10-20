import React, { useCallback } from 'react';
import styles from './MenuBar.module.scss';
import { useCodeContext } from 'providers/CodeProvider';
import { downloadBefungeFile, uploadBefungeFile } from 'utils/FileUtils';

export const MenuBar: React.FC = () => {
    const { code, codeDispatch } = useCodeContext();

    const save = useCallback(() => {
        downloadBefungeFile(
            "befungeprogram.txt",
            code
        );
    }, [code]);

    const upload = useCallback(() => {
        uploadBefungeFile((file: string[]) => {
            codeDispatch({
                type: "allset",
                newCode: file.map(row => row.split(""))
            });
        });
    }, [codeDispatch]);

    const clear = useCallback(() => {
        codeDispatch({type: "clear"});
    }, [codeDispatch]);

    return (
        <div className={styles.menubar}>
            <button onClick={save}>Save</button>
            <button onClick={upload}>Load</button>
            <button onClick={clear}>Clear</button>
        </div>
    );
}