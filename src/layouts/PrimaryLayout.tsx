import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { PrimaryHeader } from 'components/PrimaryHeader';
import styles from './PrimaryLayout.module.scss';

export const PrimaryLayout: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.primaryLayout}>
            <PrimaryHeader />

            <div className={styles.container}>
                <div ref={contentRef} className={styles.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}