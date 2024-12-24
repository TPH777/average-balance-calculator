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
  return (
    <>
      <tbody>
        {Array.from({ length: 31 }, (_, index) => (
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
