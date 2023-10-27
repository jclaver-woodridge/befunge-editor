import * as StackProviderModule from 'providers/StackProvider';
import { IStackContext } from 'providers/StackProvider';

export const mockUseStackContext = (context?: Partial<IStackContext>) => {
    return jest.spyOn(StackProviderModule, "useStackContext")
        .mockReturnValue({
            stack: context?.stack ?? [],
            stackDispatch: context?.stackDispatch ?? (() => {})
        });
}