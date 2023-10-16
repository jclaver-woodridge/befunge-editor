import { BefungeInterpreter } from "./BefungeInterpreter";

describe("basic programs", () => {
    test("Hello World", () => {
        const bf = new BefungeInterpreter([
            [">", '"', "!", "i", "H", '"', ">", ":", "#", ",", "_", "@"]
        ]);

        expect(bf.run()).toEqual("Hi!");
    });

    test("2D plane movement", () => {
        const bf = new BefungeInterpreter([
            '>"cb"v> v',
            'v,"a"<   ',
            '    @ , <',
            '>     ^  ',
        ]);

        expect(bf.run()).toEqual("abc");
    });

    test("grid wrapping", () => {
        const bf = new BefungeInterpreter([
            '>v@   ',
            'v"<Hi!',
            ' >v   ',
            '>:#,_@',
        ]);

        expect(bf.run()).toEqual("<Hi!vv:>");
    });

    test("hello world with only one quotation mark", () => {
        const bf = new BefungeInterpreter([
            'v       ',
            '" v  <  ',
            '>$v  ,  ',
            '! \\     ',
            'i :  \\  ',
            'H > #^_@',
        ]);

        expect(bf.run()).toEqual("Hi!");
    });

    test("random direction should choose options w/ equal likelihood", () => {
        const bf = new BefungeInterpreter([
            '"dd"*v',
            'v1<   ',
            'v2?v#<',
            'v3< >|',
            'v4 <:@',
            '>.1-^ ',
        ]);

        let res = bf.run();
        let resVals = res.split(" ").map(n => parseInt(n));
        let expected = resVals.length / 4;
        let chisq = 0;
        for (let i = 1; i <= 4; i++) {
            let actual = resVals.filter(n => n == i).length;
            chisq += ((actual - expected)**2) / expected;
        }
        expect(chisq).toBeLessThan(11.345); // chisq for 3 DOF, .01 significance level
            // the idea of this is: we cannot ever prove that the directions are chosen
            //  equally often, but if we *can* say with 99% confidence that it's unfair,
            //  then we can be pretty confident that this test is a fail. since this
            //  test draws 10001 random directions, it will very, very likely detect any
            //  unfairness
    });

    test("quine", () => {
        // quine taken from https://www.codewars.com/kata/526c7b931666d07889000a3c
        // it's a clever idea: use the get command to literally just grab the code ASCII
        //  this is done for 45 iterations - the length of the code
        // i wonder how hard it would be to make a quine without the get command?
        const bf = new BefungeInterpreter([
            '01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@'
        ]);

        expect(bf.run()).toEqual('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@');
    });

    test("numeric inputs, add three numbers", () => {
        const bf = new BefungeInterpreter([
            '&&+&+.@'
        ]);

        bf.feedInput("123 456 789");

        expect(bf.run()).toEqual("1368 ");
    });

    test("character inputs, cat program", () => {
        const bf = new BefungeInterpreter([
            '>"~":v',
            '     ~',
            '     \\',
            '   v-<',
            '   :  ',
            '^,+_@ ',
        ]);

        bf.feedInput("Hi there, this is a cat-like program~~~! It stops at ~.");

        expect(bf.run()).toEqual("Hi there, this is a cat-like program");
    });

    test("factorial", () => {
        const bf = new BefungeInterpreter([
            '195+ v',
            'vp34:<',
            '* > :|',
            '4 -  $',
            '3 1  .',
            '>g^  @',
        ]);

        expect(bf.run()).toEqual("87178291200 ");
    });

    test("interesting factorial", () => {
        const bf = new BefungeInterpreter([
            '18>:80pv      ',
            ':#^_$.@>*80g1-'
        ]);

        expect(bf.run()).toEqual("40320 ");
    });

    test("cool random number generator", () => {
        // the 3 at 0,3 means that this will generate random 3-digit numbers in base-4
        //  (so in other words, a random number in [0,63].)
        const bf = new BefungeInterpreter([
            '&:#v_$@',
            '   3^ <',
            'v0<>0v ',
            'v1?v#<:',
            'v2<  *-',
            'v3 < 41',
            '+    \\.',
            '>\\1-:|$',
            '     >^'
        ]);

        bf.feedInput("1000 ");
        const output = bf.run();

        expect(
            output.split(" ")
                .map(n => parseInt(n))
                .filter(n => n < 0 || n >= 64)
        ).toHaveLength(0);
    });

    test("self-modifying calculator", () => {
        const bf = new BefungeInterpreter([
            '~60p&& .@'
        ]);

        const num1 = 8;
        const num2 = 5;
        const symbolPairs = [
            ["+", "13 "],
            ["-", "3 "],
            ["*", "40 "],
            ["/", "1 "],
            ["%", "3 "],
            [".", "5 8 "],
            ["#", ""]
        ];

        symbolPairs.forEach(pair => {
            bf.reset();
            bf.feedInput(pair[0]);
            bf.feedInput(`${num1} ${num2}`);

            expect(bf.run()).toEqual(pair[1]);
        });
    });
});