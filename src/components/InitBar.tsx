import { useEffect, useState } from "react";

export function InitBar({
  setOffsettedGoal,
}: {
  setOffsettedGoal: (goal: number) => void;
}) {
  const [endBalance, setEndBalance] = useState<string>("100000");
  const [avgBalance, setAverageBalance] = useState<string>("100000");
  const [savingGoal, setSavingGoal] = useState<string>("500");

  useEffect(() => {
    const offsettedGoal =
      Number(avgBalance) + Number(savingGoal) - Number(endBalance);
    if (!isNaN(offsettedGoal)) {
      setOffsettedGoal(offsettedGoal);
    }
  }, [endBalance, avgBalance, savingGoal]);

  const handleInputChange = (value: string, setter: (val: string) => void) => {
    if (/^-?\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="sheet">End Balance Last Month</th>
            <th className="sheet">Avg Balance Last Month</th>
            <th className="sheet">Saving Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="initBar"
                value={endBalance}
                inputMode="decimal"
                onChange={(e) =>
                  handleInputChange(e.target.value, setEndBalance)
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="initBar"
                value={avgBalance}
                inputMode="decimal"
                onChange={(e) =>
                  handleInputChange(e.target.value, setAverageBalance)
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="initBar"
                value={savingGoal}
                inputMode="decimal"
                onChange={(e) =>
                  handleInputChange(e.target.value, setSavingGoal)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
