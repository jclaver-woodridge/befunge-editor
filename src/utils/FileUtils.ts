// Converts and downloads a befunge program
export function downloadBefungeFile(name: string, program: string[][]) {
    const data = convertBefungeFile(program);
    downloadFile(name, data);
}

// Converts a befunge program to a format that can be downloaded
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