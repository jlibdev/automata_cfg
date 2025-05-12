import { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { ArrowRightLeft, ChevronLeft } from "lucide-react";
import SimulatorValidator from "./modules/SimulatorValidator";
import { customAmGrammar } from "./modules/grammar";
import { getDerivation } from "./modules/CFGs";

const App = () => {
  const [inputString, setInputString] = useState<string>("");

  const [selectedGrammar, setSelectedGrammar] = useState<"am" | "unam">("unam");

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [checkString, setCheckString] = useState<string>("");

  const [isStringAccepted, setisStringAccepted] = useState(false);

  const formalLanguage = `Language = { aⁿc | n ≥ 0 } ∪ { a * (acb)ⁿ aᵐc | n ≥ 1, m ≥ 0 } `;

  const languageRegex = `Regular Expression = a*(acb)*a*c`;

  const handleOnCheckString = () => {
    setCheckString(inputString);
    getDerivation(customAmGrammar, "aacbc", "r");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  return (
    <>
      <div className="h-screen w-screen gap-4 flex flex-col justify-between">
        <header className="p-4">
          <Button
            onClick={() =>
              window.open("https://automata-simulator.vercel.app/", "_blank")
            }
          >
            <ChevronLeft /> FA SIMULATOR
          </Button>
        </header>
        <main className="p-10 flex flex-col gap-5">
          <section className="flex flex-col gap-2">
            <h1 className="text-center font-bold text-2xl p-2">
              CFG SIMULATOR
            </h1>
            <h1 className="text-center">{formalLanguage}</h1>
            <h1 className="text-center">{languageRegex}</h1>
            <section className="flex gap-2 justify-center">
              <Label>RULES</Label>
              <Button
                className="hover:scale-105 transition-transform"
                onClick={() =>
                  selectedGrammar == "am"
                    ? setSelectedGrammar("unam")
                    : setSelectedGrammar("am")
                }
              >
                <ArrowRightLeft />
              </Button>
            </section>
            <h1 className="text-center">
              {selectedGrammar == "am" ? (
                <>{`S → aS | aSbS | c`}</>
              ) : (
                <>
                  S → X | Y<br />
                  X → aXbX | c<br />Y → aS | aXbY
                </>
              )}
            </h1>
          </section>
          <section className="flex flex-col gap-2">
            <Label htmlFor="inputString">Input String</Label>
            <section className="flex gap-5">
              <Input
                name="inputString"
                type="text"
                onChange={(e) => setInputString(e.target.value)}
                onKeyDown={handleOnKeyDown}
                className={
                  !isStringAccepted
                    ? "ring-4 ring-red-400 focus-visible:ring-red-400"
                    : ""
                }
              />
              <Button onClick={() => setInputString("")}>Clear</Button>
              <Button onClick={handleOnCheckString} ref={buttonRef}>
                Check String
              </Button>
            </section>
          </section>
          <section className="flex">
            <Label>
              <p>Status :</p>
              {isStringAccepted ? (
                <span className="text-green-400">String Accepted</span>
              ) : (
                <span className="text-red-400">String Rejected</span>
              )}
            </Label>
          </section>
          <SimulatorValidator
            input={checkString}
            grammar={selectedGrammar}
            setIsStringAccepted={setisStringAccepted}
          ></SimulatorValidator>
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default App;
