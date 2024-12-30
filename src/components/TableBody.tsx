import { useEffect, useState } from "react";
import { daysInMonth } from "../functions/date";
import { TableRows } from "./TableRows";
import { getUpdatedActions } from "../functions/action";

export function TableBody({ offsettedGoal }: { offsettedGoal: number }) {
  const [monthTransaction, setMonthTransaction] = useState<number[][]>(
    Array.from({ length: daysInMonth }, () => [0])
  );
  const [monthAction, setMonthAction] = useState<number[]>(
    Array(daysInMonth).fill(0)
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
        {Array.from({ length: daysInMonth }, (_, index) => (
          <TableRows
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
