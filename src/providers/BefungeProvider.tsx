import React, { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { BefungeInterpreter } from 'utils/BefungeInterpreter';

export function createInitialCode() {
    const res = [];
    for (let i = 0; i < 25; i++) {
        res.push(new Array(80).fill(" "));
    }
    return res;
}

export interface IBefungeContext {
    befungeInterpreter: BefungeInterpreter;
}

const BefungeContext = createContext<IBefungeContext>({
    befungeInterpreter: new BefungeInterpreter([[]])
});

export const useBefungeContext = () => useContext(BefungeContext);

export const BefungeProvider: React.FC<PropsWithChildren> = (props) => {
    const befungeContextValue = useMemo(
        () => ({befungeInterpreter: new BefungeInterpreter(createInitialCode())}),
        []
    );

    return (
        <BefungeContext.Provider value={befungeContextValue}>
            {props.children}
        </BefungeContext.Provider>
    )
}