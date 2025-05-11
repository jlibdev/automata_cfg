import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { ChevronLeft } from "lucide-react";

const App = () => {
  const [inputString, setInputString] = useState<string>("");

  const [isStringAccepted, setisStringAccepted] = useState(false);

  const formalLanguage = `Language = { aⁿc | n ≥ 0 } ∪ { a * (acb)ⁿ aᵐc | n ≥ 1, m ≥ 0 } `;

  const languageRegex = `Regular Expression = a*((acb)+)a*c`;

  const handleOnCheckString = () => {};
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
          </section>
          <section className="flex flex-col gap-2">
            <Label htmlFor="inputString">Input String</Label>
            <section className="flex gap-5">
              <Input
                name="inputString"
                type="text"
                onChange={(e) => setInputString(e.target.value)}
              />
              <Button onClick={handleOnCheckString}>Check String</Button>
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
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default App;
