import { useState } from "react";
import { roundNumber } from "../functions/action";

export interface TableRowProps {
  index: number;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  monthAction: number[];
}

export function TableRows({
  index,
  monthTransaction,
  setMonthTransaction,
  monthAction,
}: TableRowProps) {
  const [inputValue, setInputValue] = useState<string>(
    monthTransaction[index].toString()
  );

  const handleTransaction = (value: string) => {
    // Allow only valid numeric characters (including negative sign and decimal point)
    if (/^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);

      const parsedValue = Number(value);
      if (!isNaN(parsedValue)) {
        const updatedTransaction = [...monthTransaction];
        updatedTransaction[index] = parsedValue;
        setMonthTransaction(updatedTransaction);
      }
    }
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            value={inputValue}
            type="text"
            className="form-control"
            onChange={(e) => handleTransaction(e.target.value)}
          />
        </td>
        <td>{roundNumber(monthAction[index])}</td>
      </tr>
    </>
  );
}
