import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useBefungeContext } from './BefungeProvider';

export interface IControlContext {
    isStart: boolean;
    toggleStart: () => void;
    reset: () => void;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const ControlContext = createContext<IControlContext>({
    isStart: false,
    toggleStart: () => {},
    reset: () => {},
    speed: 250,
    setSpeed: () => {}
});

export const useControlContext = () => useContext(ControlContext);

export const ControlProvider: React.FC<PropsWithChildren> = (props) => {
    const { befungeInterpreter } = useBefungeContext();

    const [isStart, setIsStart] = useState(false);
    const [speed, setSpeed] = useState(250);

    const toggleStart = useCallback(() => {
        setIsStart(!isStart);
    }, [isStart, setIsStart]);

    const reset = useCallback(() => {
        befungeInterpreter.reset();
    }, [befungeInterpreter]);

    useEffect(() => {
        if (isStart) {
            let id: NodeJS.Timeout | null = setInterval(
                () => {
                    if (!befungeInterpreter.step() && id != null) {
                        clearInterval(id);
                        id = null;
                        setIsStart(false);
                    }
                },
                speed
            );

            return () => {
                if (id != null) {
                    clearInterval(id);
                    id = null;
                }
            }
        } else {
            // nothing
            return;
        }
    }, [isStart, setIsStart, befungeInterpreter, speed]);

    const controlContextVal = useMemo(
        () => ({isStart, toggleStart, reset, speed, setSpeed}),
        [isStart, toggleStart, reset, speed, setSpeed]
    );

    return (
        <ControlContext.Provider value={controlContextVal}>
            {props.children}
        </ControlContext.Provider>
    )
}