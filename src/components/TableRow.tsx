import { daysInMonth } from "../functions/date";

export interface TableRowProps {
  index: number;
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  monthAction: number[];
  setMonthAction: (month: number[]) => void;
  savingGoal: number;
}

export function TableRow({
  index,
  monthBalance,
  setMonthBalance,
  monthTransaction,
  setMonthTransaction,
  monthAction,
  setMonthAction,
  savingGoal,
}: TableRowProps) {
  const handleTransaction = (newTransaction: number) => {
    const changeInTransaction = newTransaction - monthTransaction[index];
    const updatedBalance = [...monthBalance];
    for (let i = index; i < daysInMonth; i++) {
      updatedBalance[i] = monthBalance[i] + changeInTransaction;
    }
    setMonthBalance(updatedBalance);

    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index] = newTransaction;
    setMonthTransaction(updatedTransaction);

    var totalBalance = 0;
    for (let i = 0; i < daysInMonth; i++) {
      totalBalance += updatedBalance[i];
    }
    const averageBalance = totalBalance / daysInMonth;
    const balanceFromGoal = savingGoal - averageBalance;
    const updatedAction = [...monthAction];
    for (let i = 0; i < daysInMonth; i++) {
      updatedAction[i] =
        Math.ceil(((balanceFromGoal * daysInMonth) / (daysInMonth - i)) * 100) /
        100;
    }
    setMonthAction(updatedAction);
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
        <td>{monthAction[index]}</td>
      </tr>
    </>
  );
}
