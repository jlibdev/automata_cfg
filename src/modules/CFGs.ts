import type { grammarDefinition } from "./grammar";

export type derivativeTableType = {
    rule : string , state : string
}


let derivativeTable : Array<Array<derivativeTableType>> = []


// function retrieves the next NonTerminal Symbol from the state string
function getIndexOfSymbol (str: string, symbols : Array<string> , dir : "l" | "r"){

    if(dir=="l"){
        
        for(let i = 0; i < str.length;i++){
           
            if(symbols.includes(str[i])){
                return i;
            }
        }
    }
    else{
        for(let i = str.length; i >= 0;i--){
            if(symbols.includes(str[i])){
                return i;
            }
        }
    }

    return -1;
}

function replaceAt(str : string, index : number, replacement : string) {
  return str.slice(0, index) + replacement + str.slice(index + 1);
}


function deriveString(grammar : grammarDefinition , input_string : string , dTable :  Array<derivativeTableType>, mode : "l" | "r" = "l") {

    console.log(dTable);
    // Base case
    // If input string is empty or when the length of the string state is more than the input string . This is assuming that language does not have any empty terminals
    if(!input_string || dTable[dTable.length-1].state.length > input_string.length){
        return;
    }

    // Takes the latest state from our derivation table
    const current_state = dTable[dTable.length-1].state;

    // If our latest state from derivation table matches our inputsting then we can add to the results
    if(current_state == input_string){
        return derivativeTable.push(dTable);
    }

    // Takes the index at which the Next Non-Terminal Symbol is depending on the Direction of the derivation
    const rule_index = getIndexOfSymbol(current_state, grammar.nonTerminal_symbols, mode);

    // Our Non-terminal symbol that we are going to replace with rules
    const play_rule = current_state[rule_index]

    // Get the available rules applicable to out selected rule
    const ruleOptions = grammar.rules.find(rule => rule.rule == play_rule)

    if(ruleOptions){
        // Iterate over the options available for the selected rule 
        ruleOptions.options.map(option => {
            // Checks the direction of our derivation
            const new_state = replaceAt(current_state , rule_index , option);
            // This is the new state after replacing the Rule with the option
            
            if (mode == "l") {
                // Filter some results that will not be used for finding the deriviation and lessen depth of recursion
                // input_string.slice(0,rule_index) == new_state.slice(0,rule_index) makes sure that we accept only new states that are subsets of input
                // new_state.length <= input_string.length make sures that we only proceed to a recursion if we know that the new state's length is less than input string which means it still viable
                if(input_string.slice(0,rule_index) == new_state.slice(0,rule_index) && new_state.length <= input_string.length){
                    deriveString(grammar, input_string, [...dTable, {rule : `${play_rule} → ${option}` , state: new_state}] , "l")
                }
            } 
            else {                
                if(new_state.length <= input_string.length){
                    deriveString(grammar, input_string, [...dTable, {rule : `${play_rule} → ${option}` , state: new_state}] , "r")
                }
            }
        });
    }
}

export function getDerivation (grammar : grammarDefinition , input : string , mode : "l" | "r") {
    derivativeTable = [];
    deriveString(grammar, input, [{rule : "S" , state: "S"}] , mode);
    console.log(derivativeTable)
    return derivativeTable;
}


