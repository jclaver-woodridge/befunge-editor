import React from 'react';
import { BefungeProvider } from './BefungeProvider';
import { CodeProvider } from './CodeProvider';
import { OutputProvider } from './OutputProvider';
import { ControlProvider } from './ControlProvider';

export const Providers: React.FC<React.PropsWithChildren> = props => (
    <BefungeProvider>
        <CodeProvider>
            <ControlProvider>
                <OutputProvider>
                    {props.children}
                </OutputProvider>
            </ControlProvider>
        </CodeProvider>
    </BefungeProvider>
);