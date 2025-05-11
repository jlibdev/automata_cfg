import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Parser, Grammar } from "nearley";
import type { CompiledRules } from "nearley";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

// For Typescipt , Parse Error Type
type NearleyParseError = Error & {
  offset?: number;
  token?: any;
};

function ParseTree({
  input,
  grammar,
  setIsStringAccepted,
}: {
  input: string;
  grammar: CompiledRules;
  setIsStringAccepted: Dispatch<SetStateAction<boolean>>;
}) {
  // Result state holder
  const [result, setResult] = useState<any>(null);

  // Errors state holder
  const [error, setError] = useState<string>("");

  // Run this code everytime parameter/prop "input" changes
  useEffect(() => {
    // Create new Parser from nearly
    const parser = new Parser(Grammar.fromCompiled(grammar));

    try {
      // Gives the parser thing to parse
      // Once you have a Parser, you can .feed it a string to parse. -- NearlyJs Documentation
      parser.feed(input);

      /*
      Nearly Documentation Notes: 

      Finally, you can query the .results property of the parser.

      Why is parser.results an array? Sometimes, a grammar can parse a particular string in multiple different ways. 
      For example, the following grammar parses the string "xyz" in two different ways.

      */

      // Check if parser returns any valid parse
      if (parser.results.length === 0) {
        // Set states to reflect on frontend and log results
        setError("Input not accepted by grammar.");
        setResult(null);
        setIsStringAccepted(false);
      } else {
        // Set states to reflect on frontend and log results
        setResult(parser.results);
        setError("");
        setIsStringAccepted(true);
      }
    } catch (e) {
      // In case there are any errors in the parsing process
      // Set states to reflect on frontend and log results
      const err = e as NearleyParseError;
      setError(err.message);
      setResult(null);
      setIsStringAccepted(false);
      console.log(`Error Offset : ${err.offset}`);
      console.log(`Error Token : ${err.token}`);
    }
  }, [input]);

  console.log(`Grammar Results ${result}`);
  console.log(`Grammar Errors ${error}\n`);

  return (
    <div>
      <div className="flex flex-wrap">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Result (JSON)
              <>
                <p>Total parses: {result?.length ?? 0}</p>
              </>
            </AccordionTrigger>
            <AccordionContent>
              {result ? (
                <pre>{JSON.stringify(result, null, 1)}</pre>
              ) : (
                <Label>This is a rejected String</Label>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Errors</AccordionTrigger>
            <AccordionContent>
              <section>
                {error ? <pre>{error}</pre> : <Label>No Error Found</Label>}
              </section>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="item-3">
            <AccordionTrigger>Derivations</AccordionTrigger>
            <AccordionContent>Derivations</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Trees</AccordionTrigger>
            <AccordionContent>Parse Trees</AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
    </div>
  );
}

export default ParseTree;
