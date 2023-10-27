import * as CodeProviderModule from 'providers/CodeProvider';
import { ICodeContext } from 'providers/CodeProvider';

export const mockUseCodeContext = (context?: Partial<ICodeContext>) => {
    return jest.spyOn(CodeProviderModule, "useCodeContext")
        .mockReturnValue({
            code: context?.code ?? [[]],
            codeDispatch: context?.codeDispatch ?? (() => {}),
            cursor: context?.cursor ?? [0,0]
        });
}