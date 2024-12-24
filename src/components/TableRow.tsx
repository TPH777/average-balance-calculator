import { useState } from "react";

export interface TableRowProps {
  index: number;
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  savingGoal: number;
}

export function TableRow({
  index,
  monthBalance,
  setMonthBalance,
  monthTransaction,
  setMonthTransaction,
  savingGoal,
}: TableRowProps) {
  const [action, setAction] = useState<number>(0);

  const handleTransaction = (newTransaction: number) => {
    const changeInTransaction = newTransaction - monthTransaction[index];
    const updatedBalance = [...monthBalance];
    for (let i = index; i < 31; i++) {
      updatedBalance[i] = monthBalance[i] + changeInTransaction;
    }
    setMonthBalance(updatedBalance);

    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index] = newTransaction;
    setMonthTransaction(updatedTransaction);
    setAction(0);
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{monthBalance[index]}</td>
        <td>
          <input
            value={monthTransaction[index]}
            type="number"
            className="form-control"
            onChange={(transaction) =>
              handleTransaction(Number(transaction.target.value))
            }
          />
        </td>
        <td>{action + savingGoal}</td>
      </tr>
    </>
  );
}
