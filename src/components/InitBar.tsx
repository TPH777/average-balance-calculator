import { isNumber } from "../functions/number";

interface InitBarProps {
  savingGoal: string;
  setSavingGoal: (balance: string) => void;
  endBalance: string;
  setEndBalance: (balance: string) => void;
  avgBalance: string;
  setAvgBalance: (balance: string) => void;
}

export function InitBar({
  savingGoal,
  setSavingGoal,
  endBalance,
  setEndBalance,
  avgBalance,
  setAvgBalance,
}: InitBarProps) {
  const handleInput = (input: string, setter: (val: string) => void) => {
    if (isNumber(input)) {
      setter(input);
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
                onChange={(e) => handleInput(e.target.value, setEndBalance)}
              />
            </td>
            <td>
              <input
                type="text"
                className="initBar"
                value={avgBalance}
                inputMode="decimal"
                onChange={(e) => handleInput(e.target.value, setAvgBalance)}
              />
            </td>
            <td>
              <input
                type="text"
                className="initBar"
                value={savingGoal}
                inputMode="decimal"
                onChange={(e) => handleInput(e.target.value, setSavingGoal)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
