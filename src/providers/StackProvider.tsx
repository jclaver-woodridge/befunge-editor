import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useBefungeContext } from './BefungeProvider';

export interface StackModifyAction {
    type: "push" | "pop";
    val: number | null;
}

export function stackReducer(stack: number[], action: StackModifyAction) {
    switch (action.type) {
        case "push":
            return [...stack, action.val as number];
        case "pop":
            return stack.slice(0, stack.length - 1);
    }
}

export interface IStackContext {
    stack: number[];
    stackDispatch: React.Dispatch<StackModifyAction>;
}

const StackContext = createContext<IStackContext>({
    stack: [],
    stackDispatch: () => {}
});

export const useStackContext = () => useContext(StackContext);

export const StackProvider: React.FC<PropsWithChildren> = (props) => {
    const { befungeInterpreter } = useBefungeContext();

    const [stack, stackDispatch] = useReducer(stackReducer, null, () => []);

    useEffect(() => {
        befungeInterpreter.setStackCallback((x: number | null) => {
            if (x != null) {
                stackDispatch({
                    type: "push",
                    val: x
                });
            } else {
                stackDispatch({
                    type: "pop",
                    val: null
                });
            }
        })
    }, [befungeInterpreter, stackDispatch]);

    const outputProviderValue: IStackContext = useMemo(
        () => ({stack, stackDispatch}),
        [stack, stackDispatch]
    );

    return (
        <StackContext.Provider value={outputProviderValue}>
            {props.children}
        </StackContext.Provider>
    )
}