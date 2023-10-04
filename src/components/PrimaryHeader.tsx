import React from 'react';
import styles from './PrimaryHeader.module.scss';

export const PrimaryHeader: React.FC = () => {
    return (
        <div className={styles.header}>
            Befunge Editor
        </div>
    );
}