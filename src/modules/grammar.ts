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


export const ambigGrammar = {
  Lexer: undefined,
  ParserRules: [
    {
      name: "S",
      symbols: [{ literal: "a" }, "S"],
      postprocess: (data: any[]) => ['S', data[1]]
    },
    {
      name: "S",
      symbols: [{ literal: "a" }, "S", { literal: "b" }, "S"],
      postprocess: (data: any[]) => ['a', data[1], 'b', data[3]]
    },
    {
      name: "S",
      symbols: [{ literal: "c" }],
      postprocess: () => 'c'
    }
  ],
  ParserStart: "S"
};


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