import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as FileUtils from 'utils/FileUtils';
import { MenuBar } from './MenuBar';
import { mockUseCodeContext } from 'test/mocks/mockUseCodeContext';

describe('the save button', () => {
    test('should render as a button with the word "save" somewhere on it', () => {
        mockUseCodeContext();

        render(<MenuBar/>);

        expect(screen.getByRole("button", {"name": /save/i})).toBeInTheDocument();
    });

    test('should try to download the program as befungeprogram.txt on click', () => {
        mockUseCodeContext({
            code: [["a", "b"], ["c", "d"]]
        });

        const downloadSpy = jest.spyOn(FileUtils, "downloadBefungeFile")
            .mockImplementation(jest.fn());

        render(<MenuBar/>);

        const btn = screen.getByRole("button", {"name": /save/i});
        fireEvent.click(btn);

        expect(downloadSpy).toHaveBeenCalledWith(
            "befungeprogram.txt",
            [["a", "b"], ["c", "d"]]
        );
    });
});

describe('the load button', () => {
    test('should render as a button with the word "load" somewhere on it', () => {
        mockUseCodeContext();

        render(<MenuBar/>);

        expect(screen.getByRole("button", {"name": /load/i})).toBeInTheDocument();
    });

    test('should try to grab a file upload and set the program to its contents on click', () => {
        const codeDispatch = jest.fn();
        mockUseCodeContext({codeDispatch});

        const uploadSpy = jest.spyOn(FileUtils, "uploadBefungeFile")
            .mockImplementation(jest.fn());

        render(<MenuBar/>);

        expect(uploadSpy).toHaveBeenCalledTimes(0);
        const btn = screen.getByRole("button", {"name": /load/i});
        fireEvent.click(btn);
        expect(uploadSpy).toHaveBeenCalledTimes(1);

        const firstCall = uploadSpy.mock.calls[0][0];
        firstCall(["ab", "cd"]);
        expect(codeDispatch).toHaveBeenCalledWith({
            type: "allset",
            newCode: [["a", "b"], ["c", "d"]]
        });
    });
});

describe('the clear button', () => {
    test('should render as a button with the word "clear" somewhere on it', () => {
        mockUseCodeContext();

        render(<MenuBar/>);

        expect(screen.getByRole("button", {"name": /clear/i})).toBeInTheDocument();
    });

    test('should try to clear the code grid on click', () => {
        const codeDispatch = jest.fn();
        mockUseCodeContext({codeDispatch});

        render(<MenuBar/>);

        const btn = screen.getByRole("button", {"name": /clear/i});
        fireEvent.click(btn);

        expect(codeDispatch).toHaveBeenCalledWith({
            type: "clear"
        });
    });
});