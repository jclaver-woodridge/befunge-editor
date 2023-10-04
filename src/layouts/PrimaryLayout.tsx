import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { PrimaryHeader } from 'components/PrimaryHeader';

export const PrimaryLayout: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <PrimaryHeader />

            <div ref={contentRef}>
                <Outlet/>
            </div>
        </div>
    );
}