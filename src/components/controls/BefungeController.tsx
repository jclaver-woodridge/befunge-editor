import React from 'react';
import styles from './BefungeController.module.scss';
import { StyledProps } from 'types/StyledProps';
import classNames from 'classnames';
import { useControlContext } from 'providers/ControlProvider';

// measured in ms per instruction
export const controllerSpeeds = [0, 100, 250, 500, 2000];

export const BefungeController: React.FC<StyledProps> = (props) => {
    const { isStart, toggleStart, reset, speed, setSpeed } = useControlContext();

    const startStopText = isStart ? "Stop" : "Start";

    const speedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(parseInt(event.target.value));
    }

    return (
        <div className={classNames(styles["controller-cont"], props.className)}>
            <h2>Controls:</h2>
            <div className={styles["startstop-cont"]}>
                <button onClick={toggleStart}>{startStopText}</button>
                <button onClick={reset}>Reset</button>
            </div>

            <div className={styles["speed-cont"]}>
                {controllerSpeeds.map(speedNum => {
                    const perSec = 1000 / speedNum;
                    return (
                        <div key={`speed-${speedNum}`}>
                            <input
                                id={`radio-${speedNum}`}
                                type="radio"
                                name="speed"
                                value={speedNum}
                                checked={speed == speedNum}
                                onChange={speedChange}
                            />
                            <label htmlFor={`radio-${speedNum}`}>{`${perSec} instr/sec`}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}