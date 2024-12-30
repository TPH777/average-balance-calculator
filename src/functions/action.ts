import { daysInMonth } from "./date";

export function getBalanceChange(
  monthTransaction: number[][]
): { avgChange: number; endChange: number } {
  let prevBalance = 0;
  let totalBalance = 0;
  let currBalance = 0;

  for (let i = 0; i < daysInMonth; i++) {
    let totalTransaction = 0;

    for (let j = 0; j < monthTransaction[i].length; j++) {
      totalTransaction += monthTransaction[i][j];
    }

    currBalance = prevBalance + totalTransaction;
    totalBalance += currBalance;
    prevBalance = currBalance;
  }
  const avgBalance = totalBalance / daysInMonth
  return { avgChange: avgBalance, endChange: currBalance };
}


export function getUpdatedActions(savingGoal: number, monthTransaction: number[][], monthAction: number[]): number[] {
    const { avgChange: avgBalance } = getBalanceChange(monthTransaction)
    const balanceFromGoal = savingGoal - avgBalance;
    const updatedAction = [...monthAction];
    for (let i = 0; i < daysInMonth; i++) {
        updatedAction[i] = (balanceFromGoal * daysInMonth) / (daysInMonth - i);
    }
    return updatedAction;
}
  