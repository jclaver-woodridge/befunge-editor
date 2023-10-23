// Converts and downloads a befunge program
export function downloadBefungeFile(name: string, program: string[][]) {
    const data = convertBefungeFile(program);
    downloadFile(name, data);
}

// Converts a befunge program to a format that can be downloaded
// This conversion involves removing trailing spaces until the program is a trimmed rectangle,
//  and replacing special characters with spaces.
// Returns the converted program
export function convertBefungeFile(programOrig: string[][]) {
    // creating program copy for export
    // (also turning any special characters into spaces)
    const program = programOrig.map(
        row => row.map(
            col => (col.charCodeAt(0) >= 32 ? col[0] : " ")
        )
    );

    // finding bounds of program
    let maxRow = 0;
    let maxCol = 0;
    for (let row = 0; row < program.length; row++) {
        for (let col = 0; col < program[row].length; col++) {
            if (program[row][col] != " ") {
                maxRow = row;
                if (col > maxCol) {maxCol = col;}
            }
        }
    }

    return program.slice(0, maxRow + 1).map(
        row => row.join("").padEnd(maxCol + 1, " ").substring(0, maxCol + 1) + "\n"
    );
}

// Downloads a file, given a name and the file contents.
export function downloadFile(name: string, data: string[]) {
    const file = new File(
        data,
        name,
        {type: "text/plain"}
    );

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = name;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Prompts the user to upload a Befunge program file
// Will call the provided callback with the lines of the file
export function uploadBefungeFile(callback: (file: string[]) => void) {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = () => {
        if (input.files != null) {
            const upload: File = input.files[0];
            upload.text()
                .then((v) => {
                    const lines = v.split("\n");
                    if (lines[lines.length - 1].length == 0) {
                        lines.pop();
                    }
                    callback(lines);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        document.body.removeChild(input);
    }

    document.body.appendChild(input);
    input.click();
}

// Pads the given Befunge program to a given width and height
// Returns the modified program
export function padBefungeProgram(program: string[] | string[][], width: number, height: number) {
    const sizedProgram: string[][] = [];

    for (let row = 0; row < height; row++) {
        sizedProgram.push([]);
        for (let col = 0; col < width; col++) {
            if (row < program.length && col < program[row].length) {
                sizedProgram[row].push(program[row][col]);
            } else {
                sizedProgram[row].push(" ");
            }
        }
    }

    return sizedProgram;
}