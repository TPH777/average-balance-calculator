import { useState } from "react";
import "./App.css";
import { InitBar } from "./components/InitBar";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";
function App() {
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  return (
    <>
      <InitBar setOffsettedGoal={setOffsettedGoal} />
      <table>
        <TableHeader />
        <TableBody offsettedGoal={offsettedGoal} />
      </table>
    </>
  );
}

export default App;
