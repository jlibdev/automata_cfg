// Code is Generated Using NearlyJs Parser Playground
/*
I used the Basic Grammar option with input

S -> "a" S 
   | "a" S "b" S
   | "c"

and 

S -> X
   | Y

X -> "a" X "b" X
   | "c"

Y -> "a" S
   | "a" X "b" Y
   

   and Downloaded the Grammar as JS as Provided by Nearly

   Converted to React

*/


// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley


// Rules for the initial Language that is ambiguous


export const ambigGrammar = {
  Lexer: undefined,
  ParserRules: [
    {
      name: "S",
      symbols: [{ literal: "a" }, "S"],
      postprocess: (d : Array<any>) => ({
        rule : "aS",
        value: [d[0], d[1]],
      }),
    },
    {
      name: "S",
      symbols: [{ literal: "a" }, "S", { literal: "b" }, "S"],
       postprocess: (d : Array<any>) => ({
        rule : "aSbS",
        value: [d[0], d[1], d[2], d[3]],
      }),
    },
    {
      name: "S",
      symbols: [{ literal: "c" }],
       postprocess: (d : Array<any>) => ({
        rule : "c",
        value: d[0],
      }),
    }
  ],
  ParserStart: "S"
};



// Rules for the initial Language that is unambiguous
export const unambigGrammar = {
   Lexer: undefined,
   ParserRules : [
    {
      name : "S",
      symbols : ["X"]
    },
    {
      name : "S",
      symbols : ["Y"]
    },
    {
      name : "X",
      symbols : [{literal : "a"} , "X" , {literal : "b"} , "X"]
    },
    {
      name : "X",
      symbols : [{literal : "c"}]
    },
    {
      name : "Y",
      symbols : [{literal : "a"} , "S"]
    },
    {
      name : "Y",
      symbols : [{literal : "a"} , "X", {literal : "b"} , "Y"]
    }
   ],
    ParserStart: "S"
}


// Custom Grammar build using Custom Logic

// Types for grammar

export type customGrammarType = {
    rule : string;
    options : Array<string>;
}

export type grammarDefinition = {
    nonTerminal_symbols : Array<string>,
    terminal_symbols : Array<string>,
    start_variable : string,
    rules : Array<customGrammarType>;
}

// Follows formal definition of CFG format

export const customAmGrammar : grammarDefinition = {
        nonTerminal_symbols : ["S"],
        terminal_symbols : ["a", "b", "c"],
        start_variable : "S",
        rules : [
            {rule : "S" , options : ["aS","aSbS","c"]},
        ]
    }

export const CustomUnAmGrammar : grammarDefinition = {
        nonTerminal_symbols : ["S" , "X" , "Y"],
        terminal_symbols : ["a", "b", "c"],
        start_variable : "S",
        rules : [
            {rule : "S" , options : ["X" , "Y"]},
            {rule : "X" , options : ["aXbX","c"]},
            {rule : "Y" , options : ["aS", "aXbY"]},
        ]
    }