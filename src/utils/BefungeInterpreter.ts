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

    #x: number = 0;
    #y: number = 0;
    #dir: Dir = ">";
    #stringMode: boolean = false;
    #program: string[][] = [];
    #stack: number[] = [];

    #input: string = "";
    #output: string = "";
    #outputCallback: (s: string) => void = () => {};

    constructor(program: string[][] | string[]) {
        // getting program dimensions
        this.#height = program.length;
        this.#width = program[0].length;

        // copying the given program into an initial state
        this.#initialProgram = [];
        if (isStrArr(program)) {
            for (let i = 0; i < this.#height; i++) {
                this.#initialProgram.push(program[i].split(""));
            }
        } else {
            for (let i = 0; i < this.#height; i++) {
                this.#initialProgram.push([...program[i]]);
            }
        }

        // resetting the program state
        this.reset();
    }

    reset() {
        this.#program = [];
        for (let i = 0; i < this.#height; i++) {
            this.#program.push([...this.#initialProgram[i]]);
        }

        this.#x = 0;
        this.#y = 0;
        this.#dir = ">";
        this.#stringMode = false;

        this.#stack = [];

        this.#input = "";
        this.#output = "";
    }

    setAt(x: number, y: number, value: string, permanent: boolean = false) {
        if (value.length == 0) {value = " ";}
        if (value.length > 1) {value = value.substring(1, 2);}

        x = x % this.#width;
        if (x < 0) {x += this.#width;}
        y = y % this.#height;
        if (y < 0) {y += this.#height;}

        this.#program[y][x] = value;
        if (permanent) {
            this.#initialProgram[y][x] = value;
        }
    }

    getState() {
        let res: string[][] = [];
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
        while (this.step()) {}

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
            } else if ("+-*/%`\\g".includes(instr)) {
                // two-pop instrs
                const a = this.#pop();
                const b = this.#pop();

                switch (instr) {
                    case "+": this.#push(a + b); break;
                    case "-": this.#push(b - a); break;
                    case "*": this.#push(a * b); break;
                    case "/": this.#push(a == 0 ? 0 : (b / a)|0); break;
                    case "%": this.#push(a == 0 ? 0 : b % a); break;
                    case "`": this.#push(b > a ? 1 : 0); break;
                    case "\\": this.#push(a); this.#push(b); break;
                    case "g": this.#push(this.#program[a][b].charCodeAt(0)); break;
                    default: console.error(`unknown instr ${instr}`);
                }
            } else if ("!_|:$.,".includes(instr)) {
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
                    default: console.error(`unknown instr ${instr}`);
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

    #push(n: number) {
        this.#stack.push(n);
    }

    #pop() {
        if (this.#stack.length) {
            return this.#stack.pop() as number;
        } else {
            return 0;
        }
    }

    #move() {
        switch (this.#dir) {
            case "^": this.#y--; break;
            case "v": this.#y++; break;
            case "<": this.#x--; break;
            case ">": this.#x++; break;
        }

        if (this.#y < 0) {this.#y = this.#height - 1;}
        if (this.#y >= this.#height) {this.#y = 0;}
        if (this.#x < 0) {this.#x = this.#width - 1;}
        if (this.#x >= this.#width) {this.#x = 0;}
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