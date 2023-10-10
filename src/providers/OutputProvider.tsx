import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useBefungeContext } from './BefungeProvider';

export interface OutputModifyAction {
    type: "add" | "clear";
    val: string;
}

export function outputReducer(output: string, action: OutputModifyAction) {
    switch (action.type) {
        case "add":
            return output + action.val;
        case "clear":
            return "";
    }
}

export interface IOutputContext {
    output: string;
    outputDispatch: React.Dispatch<OutputModifyAction>;
}

const OutputContext = createContext<IOutputContext>({
    output: "",
    outputDispatch: () => {}
});

export const useOutputContext = () => useContext(OutputContext);

export const OutputProvider: React.FC<PropsWithChildren> = (props) => {
    const { befungeInterpreter } = useBefungeContext();

    const [output, outputDispatch] = useReducer(outputReducer, null, () => "");

    useEffect(() => {
        befungeInterpreter.setOutputCallback((s: string) => outputDispatch({type: "add", val: s}));
    }, [befungeInterpreter, outputDispatch]);

    const outputProviderValue: IOutputContext = useMemo(
        () => ({output, outputDispatch}),
        [output, outputDispatch]
    );

    return (
        <OutputContext.Provider value={outputProviderValue}>
            {props.children}
        </OutputContext.Provider>
    )
}