import { useState } from "react";
import { roundNumber } from "../functions/action";

export interface TableRowProps {
  index: number;
  monthTransaction: number[][];
  setMonthTransaction: (transaction: number[][]) => void;
  monthAction: number[];
}

export function TableRows({
  index,
  monthTransaction,
  setMonthTransaction,
  monthAction,
}: TableRowProps) {
  const [inputValues, setInputValues] = useState<string[]>(
    Array.from(monthTransaction[index], (num) => num.toString())
  );

  const handleTransaction = (value: string, transactionId: number) => {
    // Allow only valid numeric characters (including negative sign and decimal point)
    if (/^-?\d*\.?\d*$/.test(value)) {
      const newInputValues = [...inputValues];
      newInputValues[transactionId] = value;
      setInputValues(newInputValues);

      const parsedValue = Number(value);
      if (!isNaN(parsedValue)) {
        const updatedTransaction = [...monthTransaction];
        updatedTransaction[index][transactionId] = parsedValue;
        setMonthTransaction(updatedTransaction);
      }
    }
  };

  const handleMoreTransaction = () => {
    const newInputValues = [...inputValues, "0"];
    setInputValues(newInputValues);

    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index].push(0); // Add a new transaction with default value 0
    setMonthTransaction(updatedTransaction);
  };
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {inputValues.map((value, transactionId) => (
            <div key={`${index}-${transactionId}`}>
              <input
                value={value}
                type="text"
                inputMode="decimal"
                className="form-control"
                onChange={(e) =>
                  handleTransaction(e.target.value, transactionId)
                }
              />
              {transactionId === 0 && (
                <button onClick={handleMoreTransaction}>+</button>
              )}
              {transactionId !== inputValues.length - 1 && <br />}
            </div>
          ))}
        </td>
        <td>{roundNumber(monthAction[index])}</td>
      </tr>
    </>
  );
}
