import { TableRow } from "./TableRow";

export interface TableBodyProps {
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  savingGoal: number;
}

export function TableBody({
  monthBalance,
  setMonthBalance,
  monthTransaction,
  setMonthTransaction,
  savingGoal,
}: TableBodyProps) {
  const getDaysInCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInCurrentMonth();

  return (
    <>
      <tbody>
        {Array.from({ length: daysInMonth }, (_, index) => (
          <TableRow
            index={index}
            monthBalance={monthBalance}
            setMonthBalance={setMonthBalance}
            monthTransaction={monthTransaction}
            setMonthTransaction={setMonthTransaction}
            savingGoal={savingGoal}
          />
        ))}
      </tbody>
    </>
  );
}
