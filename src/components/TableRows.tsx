import { useEffect, useState } from "react";
import { isNumber, roundNumber } from "../functions/number";
import { updateFirestore } from "../functions/transactions";
import { Button, Form, InputGroup } from "react-bootstrap";

export interface TableRowProps {
  user: string | null;
  isCurr: number;
  index: number;
  monthTransaction: number[][];
  setMonthTransaction: (transaction: number[][]) => void;
  monthAction: number[];
}

export function TableRows({
  user,
  isCurr,
  index,
  monthTransaction,
  setMonthTransaction,
  monthAction,
}: TableRowProps) {
  const [inputValues, setInputValues] = useState<string[]>(
    Array.from(monthTransaction[index], (num) => num.toString())
  );

  useEffect(() => {
    setInputValues(
      Array.from(monthTransaction[index], (num) => num.toString())
    );
  }, [monthTransaction[index]]);

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
        updateFirestore(user, updatedTransaction, index, isCurr);
      }
    }
  };

  const addInput = () => {
    const newInputValues = [...inputValues, ""];
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
    updateFirestore(user, updatedTransaction, index, isCurr);
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {inputValues.length === 0 ? (
            <Button size="sm" variant="outline-success" onClick={addInput}>
              +
            </Button>
          ) : (
            inputValues.map((value, transactionId) => (
              <InputGroup key={`${index}-${transactionId}`}>
                <Form.Control
                  size="sm"
                  type="text"
                  value={value == "0" ? "" : value}
                  placeholder="Amount"
                  onChange={(e) => handleInput(e.target.value, transactionId)}
                />
                {transactionId === inputValues.length - 1 && (
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={addInput}
                  >
                    +
                  </Button>
                )}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeInput(transactionId)}
                >
                  x
                </Button>
                {transactionId !== inputValues.length - 1 && <br />}
              </InputGroup>
            ))
          )}
        </td>
        <td>{roundNumber(monthAction[index])}</td>
      </tr>
    </>
  );
}
