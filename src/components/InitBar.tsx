import { useEffect, useState } from "react";

export function InitBar({
  setOffsettedGoal,
}: {
  setOffsettedGoal: (goal: number) => void;
}) {
  const [endBalance, setEndBalance] = useState<number>(100000);
  const [avgBalance, setAverageBalance] = useState<number>(100000);
  const [savingGoal, setSavingGoal] = useState<number>(500);

  useEffect(() => {
    const offsettedGoal = avgBalance + savingGoal - endBalance;
    setOffsettedGoal(offsettedGoal);
    console.log(offsettedGoal);
  }, [endBalance, avgBalance, savingGoal]);

  return (
    <>
      <thead>
        <tr>
          <th className="sheet">End Balance Last Month</th>
          <th className="sheet">Avg Balance Last Month</th>
          <th className="sheet">Saving Goal</th>
        </tr>
      </thead>
      <tbody>
        <td>
          <input
            type="tel"
            pattern="-?[0-9]+"
            className="initBar"
            value={endBalance}
            onChange={(e) => setEndBalance(Number(e.target.value))}
          ></input>
        </td>
        <td>
          <input
            type="tel"
            pattern="-?[0-9]+"
            className="initBar"
            value={avgBalance}
            onChange={(e) => setAverageBalance(Number(e.target.value))}
          ></input>
        </td>
        <td>
          <input
            type="tel"
            pattern="-?[0-9]+"
            className="initBar"
            value={savingGoal}
            onChange={(e) => setSavingGoal(Number(e.target.value))}
          ></input>
        </td>
      </tbody>
    </>
  );
}
