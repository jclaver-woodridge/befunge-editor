type Dir = "^" | "v" | "<" | ">";
function isDir(s: string): s is Dir {
    return "^v<>".includes(s) && s.length == 1;
}

function isStrArr(s: string[][] | string[]): s is string[] {
    return (typeof s[0] == "string");
}

export class BefungeInterpreter {
    #width: number;
    #height: number;
    #initialProgram: string[][];

    #x = 0;
    #y = 0;
    #dir: Dir = ">";
    #stringMode = false;
    #program: string[][] = [];
    #stack: number[] = [];

    #input = "";
    #output = "";

    #outputCallback: (s: string) => void = () => {};
    #cursorCallback: (x: number, y: number) => void = () => {};
    #setCallback: (x: number, y: number, v: string) => void = () => {};
    #stackCallback: (x: number | null) => void = () => {};

    constructor(program: string[][] | string[]) {
        // getting program dimensions
        this.#height = program.length;
        this.#width = program[0].length;

        // copying the given program into an initial state
        this.#initialProgram = [];
        this.#program = [];
        if (isStrArr(program)) {
            for (let i = 0; i < this.#height; i++) {
                this.#initialProgram.push(program[i].split(""));
                this.#program.push([...this.#initialProgram[i]]);
            }
        } else {
            for (let i = 0; i < this.#height; i++) {
                this.#initialProgram.push([...program[i]]);
                this.#program.push([...this.#initialProgram[i]]);
            }
        }

        // resetting the program state
        this.reset();
    }

    clear() {
        for (let row = 0; row < this.#height; row++) {
            for (let col = 0; col < this.#width; col++) {
                this.#initialProgram[row][col] = " ";
                this.#program[row][col] = " ";
            }
        }
    }

    reset() {
        for (let row = 0; row < this.#height; row++) {
            for (let col = 0; col < this.#width; col++) {
                if (this.#program[row][col] != this.#initialProgram[row][col]) {
                    this.setAt(col, row, this.#initialProgram[row][col]);
                }
            }
        }

        this.#setCursor(0, 0);
        this.#dir = ">";
        this.#stringMode = false;

        while (this.#stack.length > 0) {
            this.#pop();
        }

        this.#input = "";
        this.#output = "";
    }

    getAt(x: number, y: number) {
        return this.#program[y][x];
    }

    setAt(x: number, y: number, value: string, external = false) {
        if (value.length == 0) {value = " ";}
        if (value.length > 1) {value = value.substring(1, 2);}

        x = x % this.#width;
        if (x < 0) {x += this.#width;}
        y = y % this.#height;
        if (y < 0) {y += this.#height;}

        this.#program[y][x] = value;
        if (external) {
            this.#initialProgram[y][x] = value;
        } else {
            this.#setCallback(x, y, value);
        }
    }

    getState() {
        const res: string[][] = [];
        for (let i = 0; i < this.#height; i++) {
            res.push([...this.#program[i]]);
        }
        return res;
    }

    getStack() {
        return [...this.#stack];
    }

    getOutput() {
        return this.#output;
    }

    run() {
        while (this.step()) {
            // do nothing
        }

        return this.#output;
    }

    step() {
        // running an instruction
        const instr = this.#program[this.#y][this.#x];

        if (this.#stringMode) {
            if (instr == '"') {
                this.#stringMode = false;
            } else {
                this.#push(instr.charCodeAt(0));
            }
        } else {
            const instrCode = instr.charCodeAt(0);
            if (instrCode >= "0".charCodeAt(0) && instrCode <= "9".charCodeAt(0)) {
                // number
                this.#push(parseInt(instr));
            } else if (isDir(instr)) {
                // basic movement
                this.#dir = instr;
            } else if (instr == "p") {
                // three-pop instrs (it's just the put instruction)
                const y = this.#pop();
                const x = this.#pop();
                const v = this.#pop();
                this.setAt(x, y, String.fromCharCode(v));
            } else if ("+-*/%`\\g".includes(instr) && instr.length == 1) {
                // two-pop instrs
                const a = this.#pop();
                const b = this.#pop();

                switch (instr) {
                    case "+": this.#push(a + b); break;
                    case "-": this.#push(b - a); break;
                    case "*": this.#push(a * b); break;
                    case "/": this.#push(a == 0 ? 0 : Math.trunc(b / a)); break;
                    case "%": this.#push(a == 0 ? 0 : b % a); break;
                    case "`": this.#push(b > a ? 1 : 0); break;
                    case "\\": this.#push(a); this.#push(b); break;
                    case "g": this.#push(this.#program[a][b].charCodeAt(0)); break;
                }
            } else if ("!_|:$.,".includes(instr) && instr.length == 1) {
                // one-pop instrs
                const a = this.#pop();

                switch (instr) {
                    case "!": this.#push(a == 0 ? 1 : 0); break;
                    case "_": this.#dir = (a == 0 ? ">" : "<"); break;
                    case "|": this.#dir = (a == 0 ? "v" : "^"); break;
                    case ":": this.#push(a); this.#push(a); break;
                    case "$": break;
                    case ".": this.#addOutput(a.toString() + " "); break;
                    case ",": this.#addOutput(String.fromCharCode(a)); break;
                }
            } else {
                // other instrs

                switch (instr) {
                    case "?": this.#dir = "^v<>"[Math.floor(Math.random() * 4)] as Dir; break;
                    case '"': this.#stringMode = true; break;
                    case "#": this.#move(); break;
                    case "&": this.#push(this.#getNumber()); break;
                    case "~": this.#push(this.#getChar().charCodeAt(0)); break;
                    case " ": break;
                    case "@": return false;
                    default: console.error(`unknown instr ${instr}`);
                }
            }
        }

        // moving the cursor
        this.#move();

        // returning true to tell the script to keep running
        return true;
    }

    feedInput(s: string) {
        this.#input += s;
    }

    setOutputCallback(c: (s: string) => void) {
        this.#outputCallback = c;
    }

    setCursorCallback(c: (x: number, y: number) => void) {
        this.#cursorCallback = c;
    }

    setSetCallback(c: (x: number, y: number, v: string) => void) {
        this.#setCallback = c;
    }

    setStackCallback(c: (x: number | null) => void) {
        this.#stackCallback = c;
    }

    #push(n: number) {
        this.#stack.push(n);
        this.#stackCallback(n);
    }

    #pop() {
        if (this.#stack.length) {
            let res = this.#stack.pop() as number;
            this.#stackCallback(null);
            return res;
        } else {
            this.#stackCallback(null);
            return 0;
        }
    }

    #setCursor(x: number, y: number) {
        this.#x = x;
        this.#y = y;
        this.#cursorCallback(x, y);
    }

    #move() {
        let x = this.#x;
        let y = this.#y;

        switch (this.#dir) {
            case "^": y--; break;
            case "v": y++; break;
            case "<": x--; break;
            case ">": x++; break;
        }

        if (y < 0) {y = this.#height - 1;}
        if (y >= this.#height) {y = 0;}
        if (x < 0) {x = this.#width - 1;}
        if (x >= this.#width) {x = 0;}

        this.#setCursor(x, y);
    }

    #getNumber() {
        while (this.#input.length == 0) {
            this.feedInput(prompt("number?") ?? "");
        }

        let spaceInd = this.#input.indexOf(" ");
        if (spaceInd == -1) {spaceInd = this.#input.length;}
        const num = parseInt(this.#input.substring(0, spaceInd));
        this.#input = this.#input.substring(spaceInd + 1);

        return isNaN(num) ? 0 : num;
    }

    #getChar() {
        while (this.#input.length == 0) {
            this.feedInput(prompt("char?") ?? "");
        }

        const res = this.#input[0];
        this.#input = this.#input.substring(1);
        return res;
    }

    #addOutput(s: string) {
        this.#output += s;
        this.#outputCallback(s);
    }
}