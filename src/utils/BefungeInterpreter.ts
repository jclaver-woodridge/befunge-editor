export class BefungeInterpreter {
    #width: number;
    #height: number;
    #initialProgram: string[][];

    #x: number; #vX: number;
    #y: number; #vY: number;
    #stringMode: boolean;
    #program: string[][];
    #stack: number[];

    constructor(program: string[][]) {
        this.#height = program.length;
        this.#width = program[0].length;
        this.#stack = [];

        // copying the given program into an initial state and current state
        this.#initialProgram = [];
        this.#program = [];
        for (let i = 0; i < this.#height; i++) {
            this.#initialProgram.push([...program[i]]);
            this.#program.push([...program[i]]);
        }

        this.#x = 0;
        this.#y = 0;
        this.#vX = 1;
        this.#vY = 0;
        this.#stringMode = false;
    }

    #push(n: number) {
        this.#stack.push(n);
    }

    #pop() {
        if (this.#stack.length) {
            return this.#stack.pop();
        } else {
            return 0;
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

    step() {

    }
}