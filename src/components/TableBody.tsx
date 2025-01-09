import { useEffect, useState } from "react";
import { TableRows } from "./TableRows";
import { getUpdatedActions } from "../functions/action";
import { getDaysInMonth } from "../functions/date";

interface TableBodyProps {
  user: string | null;
  isCurr: number;
  offsettedGoal: number;
  monthTransaction: number[][];
  setMonthTransaction: (transaction: number[][]) => void;
}

export function TableBody({
  user,
  isCurr,
  offsettedGoal,
  monthTransaction,
  setMonthTransaction,
}: TableBodyProps) {
  const [monthAction, setMonthAction] = useState<number[]>(
    Array(monthTransaction.length).fill(0)
  );

  useEffect(() => {
    const updatedAction = getUpdatedActions(
      offsettedGoal,
      monthTransaction,
      monthAction,
      isCurr
    );
    setMonthAction(updatedAction);
  }, [offsettedGoal, monthTransaction]);

  return (
    <>
      <tbody>
        {Array.from({ length: getDaysInMonth(isCurr) }, (_, index) => (
          <TableRows
            user={user}
            isCurr={isCurr}
            key={index}
            index={index}
            monthTransaction={monthTransaction}
            setMonthTransaction={setMonthTransaction}
            monthAction={monthAction}
          />
        ))}
      </tbody>
    </>
  );
}
