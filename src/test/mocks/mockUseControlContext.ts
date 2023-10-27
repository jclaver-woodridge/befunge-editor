import * as ControlProviderModule from 'providers/ControlProvider';
import { IControlContext } from 'providers/ControlProvider';

export const mockUseControlContext = (context?: Partial<IControlContext>) => {
    return jest.spyOn(ControlProviderModule, "useControlContext")
        .mockReturnValue({
            isStart: context?.isStart ?? false,
            toggleStart: context?.toggleStart ?? (() => {}),
            reset: context?.reset ?? (() => {}),
            speed: context?.speed ?? 1000,
            setSpeed: context?.setSpeed ?? (() => {})
        });
}