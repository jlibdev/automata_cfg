import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Parser, Grammar } from "nearley";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { getDerivation, type derivativeTableType } from "./CFGs";
import {
  ambigGrammar,
  customAmGrammar,
  CustomUnAmGrammar,
  unambigGrammar,
} from "./grammar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// For Typescipt , Parse Error Type
type NearleyParseError = Error & {
  offset?: number;
  token?: any;
};

function SimulatorValidator({
  input,
  grammar,
  setIsStringAccepted,
}: {
  input: string;
  grammar: "am" | "unam";
  setIsStringAccepted: Dispatch<SetStateAction<boolean>>;
}) {
  // Result state holder
  const [result, setResult] = useState<any>(null);

  // Errors state holder
  const [error, setError] = useState<string>("");

  const [leftParseTable, setLeftParseTable] = useState<
    Array<Array<derivativeTableType>>
  >([]);

  const [rightParseTable, setRightParseTable] = useState<
    Array<Array<derivativeTableType>>
  >([]);

  let treeData: any = [];

  // Run this code everytime parameter/prop "input" changes
  useEffect(() => {
    // Create new Parser from nearly
    const parser = new Parser(
      Grammar.fromCompiled(grammar == "am" ? ambigGrammar : unambigGrammar)
    );

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

        console.log(treeData);
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

    setLeftParseTable(
      getDerivation(
        grammar == "am" ? customAmGrammar : CustomUnAmGrammar,
        input,
        "l"
      )
    );

    setRightParseTable(
      getDerivation(
        grammar == "am" ? customAmGrammar : CustomUnAmGrammar,
        input,
        "r"
      )
    );
  }, [input, grammar]);

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
                <pre>{JSON.stringify(result, null, 2)}</pre>
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
          <AccordionItem value="item-3">
            <AccordionTrigger>Derivations</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-2">
              <section className="w-full gap-2 flex flex-col">
                <Label>Leftmost Derivations</Label>
                {leftParseTable.length != 0 ? (
                  leftParseTable.map((derivation, index) => (
                    <Table className="border-2 rounded-md">
                      <TableCaption>{`Derivation ${index + 1}`}</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rule</TableHead>
                          <TableHead>State</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {derivation.map((dir) => (
                          <TableRow>
                            <TableCell>{dir.rule}</TableCell>
                            <td>{dir.state}</td>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ))
                ) : (
                  <span>No Left Parse Table</span>
                )}
              </section>
              <section className="w-full gap-2 flex flex-col">
                <Label>Rightmost Derivations</Label>
                {rightParseTable.length != 0 ? (
                  rightParseTable.map((derivation, index) => (
                    <Table className="border-2 rounded-md">
                      <TableCaption>{`Derivation ${index + 1}`}</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rule</TableHead>
                          <TableHead>State</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {derivation.map((dir) => (
                          <TableRow>
                            <TableCell>{dir.rule}</TableCell>
                            <td>{dir.state}</td>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ))
                ) : (
                  <span>No Right Parse Table</span>
                )}
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Trees</AccordionTrigger>
            <AccordionContent className="h-screen border-2">
              <div className="h-full flex flex-col p-4">
                <section className="h-full flex flex-col">
                  <Label>Left Most Parse Tree</Label>
                </section>
                <section className="h-full flex flex-col">
                  <Label>Right Most Parse Tree</Label>
                </section>
              </div>
              {/* <Tree data={treeData} orientation="vertical" /> */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SimulatorValidator;
