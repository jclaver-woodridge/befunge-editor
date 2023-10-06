import React from 'react';
import { BefungeProvider } from './BefungeProvider';

export const Providers: React.FC<React.PropsWithChildren> = props => (
    <BefungeProvider>{props.children}</BefungeProvider>
);