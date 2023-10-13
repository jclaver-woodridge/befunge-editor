import React from 'react';
import { BefungeProvider } from './BefungeProvider';
import { CodeProvider } from './CodeProvider';
import { OutputProvider } from './OutputProvider';
import { ControlProvider } from './ControlProvider';
import { StackProvider } from './StackProvider';

export const Providers: React.FC<React.PropsWithChildren> = props => (
    <BefungeProvider>
        <CodeProvider>
            <ControlProvider>
                <OutputProvider>
                    <StackProvider>
                        {props.children}
                    </StackProvider>
                </OutputProvider>
            </ControlProvider>
        </CodeProvider>
    </BefungeProvider>
);