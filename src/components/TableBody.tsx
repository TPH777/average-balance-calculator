import { daysInMonth } from "../functions/date";
import { TableRow } from "./TableRow";

export interface TableBodyProps {
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  monthAction: number[];
  setMonthAction: (month: number[]) => void;
  savingGoal: number;
}

export function TableBody({
  monthBalance,
  setMonthBalance,
  monthTransaction,
  setMonthTransaction,
  monthAction,
  setMonthAction,
  savingGoal,
}: TableBodyProps) {
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
            monthAction={monthAction}
            setMonthAction={setMonthAction}
            savingGoal={savingGoal}
          />
        ))}
      </tbody>
    </>
  );
}
