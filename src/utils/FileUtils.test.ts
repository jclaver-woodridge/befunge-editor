import * as FileUtils from './FileUtils';

describe('convertBefungeFile', () => {
    test('should convert the given program to an array of line strings with newlines', () => {
        const program = [
            ["a", "b", "c"],
            ["d", "e", "z"]
        ];

        const convProgram = FileUtils.convertBefungeFile(program);

        expect(convProgram).toEqual([
            "abc\n",
            "dez\n"
        ]);
    });

    test('should trim whitespace around the program', () => {
        const program = [
            ["a", "b", "c", " "],
            ["d", "y", "z", " "],
            [" ", " ", " ", " "]
        ];

        const convProgram = FileUtils.convertBefungeFile(program);

        expect(convProgram).toEqual([
            "abc\n",
            "dyz\n"
        ]);
    });

    // (this case shouldn't really happen in practice, but i want it to work)
    test('should add whitespace to the program as needed to pad size to a rectangle', () => {
        const program = [
            ["a", "b", "c"],
            ["1", "2"],
            ["3"]
        ];

        const convProgram = FileUtils.convertBefungeFile(program);

        expect(convProgram).toEqual([
            "abc\n",
            "12 \n",
            "3  \n"
        ]);
    });

    test('should remove special characters and replace them with spaces', () => {
        const program = [
            ["a", "\n", "b"],
            ["c", "d", "\t"]
        ];

        const convProgram = FileUtils.convertBefungeFile(program);

        expect(convProgram).toEqual([
            "a b\n",
            "cd \n"
        ]);
    });

    test('complicated case', () => {
        const program = [
            ["a", "b", " ", " ", " "],
            ["d", "e", "z", " "],
            [" ", " ", "\t", " ", " "],
            [" ", "9"]
        ];

        const convProgram = FileUtils.convertBefungeFile(program);

        expect(convProgram).toEqual([
            "ab \n",
            "dez\n",
            "   \n",
            " 9 \n"
        ]);
    });

    test('should not modify the original program', () => {
        const initProgram = [
            ["a", "b", " ", " ", " "],
            ["d", "e", "z", " "],
            [" ", " ", "\t", " ", " "],
            [" ", "9"],
            [" "]
        ];
        const program = initProgram.map(row => [...row]);

        FileUtils.convertBefungeFile(program);

        expect(initProgram).toEqual(program);
    });
});

describe('padBefungeProgram', () => {
    test('should return a 2D array of strings with the given dimensions', () => {
        const program = [
            "acb",
            "dfe",
            "gih"
        ];

        const width = 4;
        const height = 5;
        const paddedProgram = FileUtils.padBefungeProgram(program, width, height);

        expect(Array.isArray(paddedProgram));
        expect(paddedProgram).toHaveLength(height);
        for (let row = 0; row < height; row++) {
            expect(Array.isArray(paddedProgram[row]));
            expect(paddedProgram[row]).toHaveLength(width);
            for (let col = 0; col < width; col++) {
                expect(typeof paddedProgram[row][col]).toBe("string");
                expect(paddedProgram[row][col]).toHaveLength(1);
            }
        }
    });

    test('should pad with spaces', () => {
        const program = [
            "acb",
            "dfe",
            "gih"
        ];

        const width = 4;
        const height = 5;
        const paddedProgram = FileUtils.padBefungeProgram(program, width, height);

        expect(paddedProgram).toEqual([
            ["a", "c", "b", " "],
            ["d", "f", "e", " "],
            ["g", "i", "h", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", " "],
        ]);
    });

    test('should correctly pad a jagged input array', () => {
        const program = [
            "123",
            "4",
            "56"
        ];

        const width = 4;
        const height = 4;
        const paddedProgram = FileUtils.padBefungeProgram(program, width, height);

        expect(paddedProgram).toEqual([
            ["1", "2", "3", " "],
            ["4", " ", " ", " "],
            ["5", "6", " ", " "],
            [" ", " ", " ", " "],
        ]);
    });

    test('should truncate extra entries in the input program', () => {
        const program = [
            "1234",
            "5678",
            "9012",
            "3456"
        ];

        const width = 3;
        const height = 2;
        const paddedProgram = FileUtils.padBefungeProgram(program, width, height);

        expect(paddedProgram).toEqual([
            ["1", "2", "3"],
            ["5", "6", "7"]
        ]);
    });
});