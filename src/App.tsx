import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

const App = () => {
  const [inputString, setInputString] = useState<string>("");

  const formalLanguage = `L = { aⁿc | n ≥ 0 } ∪ { a * (acb)ⁿ aᵐc | n ≥ 1, m ≥ 0 } `;

  const languageRegex = `R = a*((acb)+)a*c`;

  const handleOnCheckString = () => {};
  return (
    <>
      <div className="h-screen w-screen p-10">
        <section className="flex flex-col">
          <h1>{formalLanguage}</h1>
          <h1>{languageRegex}</h1>
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
      </div>
    </>
  );
};

export default App;
