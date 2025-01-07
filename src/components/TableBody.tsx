import { useEffect, useState } from "react";
import { TableRows } from "./TableRows";
import { getUpdatedActions } from "../functions/action";

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
      monthAction
    );
    setMonthAction(updatedAction);
  }, [offsettedGoal, monthTransaction]);

  return (
    <>
      <tbody>
        {Array.from({ length: monthTransaction.length }, (_, index) => (
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
