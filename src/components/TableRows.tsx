import { useState } from "react";
import { isNumber, roundNumber } from "../functions/number";

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

  const handleInput = (input: string, transactionId: number) => {
    if (isNumber(input)) {
      const newInputValues = [...inputValues];
      newInputValues[transactionId] = input;
      setInputValues(newInputValues);

      const parsedValue = Number(input);
      if (!isNaN(parsedValue)) {
        const updatedTransaction = [...monthTransaction];
        updatedTransaction[index][transactionId] = parsedValue;
        setMonthTransaction(updatedTransaction);
      }
    }
  };

  const addInput = () => {
    const newInputValues = [...inputValues, "0"];
    setInputValues(newInputValues);

    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index].push(0); // Add a new transaction with default value 0
    setMonthTransaction(updatedTransaction);
  };

  const removeInput = (transactionId: number) => {
    const newInputValues = inputValues.filter(
      (_, idx) => idx !== transactionId
    );
    setInputValues(newInputValues);

    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index] = updatedTransaction[index].filter(
      (_, idx) => idx !== transactionId
    );
    setMonthTransaction(updatedTransaction);
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {inputValues.length === 0 ? (
            <button onClick={addInput}>+</button>
          ) : (
            inputValues.map((value, transactionId) => (
              <div key={`${index}-${transactionId}`}>
                <input
                  value={value}
                  type="text"
                  inputMode="decimal"
                  className="form-control"
                  onChange={(e) => handleInput(e.target.value, transactionId)}
                />
                {transactionId === inputValues.length - 1 && (
                  <button onClick={addInput}>+</button>
                )}
                <button onClick={() => removeInput(transactionId)}>-</button>
                {transactionId !== inputValues.length - 1 && <br />}
              </div>
            ))
          )}
        </td>
        <td>{roundNumber(monthAction[index])}</td>
      </tr>
    </>
  );
}
