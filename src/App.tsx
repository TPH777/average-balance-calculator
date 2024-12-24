import { useState } from "react";
import "./App.css";
import { InitBar } from "./components/InitBar";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";
function App() {
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [monthBalance, setMonthBalance] = useState<number[]>(Array(31).fill(0));
  const [monthTransaction, setMonthTransaction] = useState<number[]>(
    Array(31).fill(0)
  );
  const [savingGoal, setSavingGoal] = useState<number>(0);

  return (
    <>
      <InitBar
        initialBalance={initialBalance}
        setInitialBalance={setInitialBalance}
        monthBalance={monthBalance}
        setMonthBalance={setMonthBalance}
        savingGoal={savingGoal}
        setSavingGoal={setSavingGoal}
      />
      <TableHeader />
      <TableBody
        monthBalance={monthBalance}
        setMonthBalance={setMonthBalance}
        monthTransaction={monthTransaction}
        setMonthTransaction={setMonthTransaction}
        savingGoal={savingGoal}
      />
    </>
  );
}

export default App;
