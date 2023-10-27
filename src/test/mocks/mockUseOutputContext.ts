import * as OutputProviderModule from 'providers/OutputProvider';
import { IOutputContext } from 'providers/OutputProvider';

export const mockUseOutputContext = (context?: Partial<IOutputContext>) => {
    return jest.spyOn(OutputProviderModule, "useOutputContext")
        .mockReturnValue({
            output: context?.output ?? "",
            outputDispatch: context?.outputDispatch ?? (() => {})
        });
}