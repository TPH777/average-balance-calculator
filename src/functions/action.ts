import { daysInMonth } from "./date";

function getAverageBalance(monthTransaction: number[][]): number {
    var prevBalance = 0;
    var totalBalance = 0;
    for (let i = 0; i < daysInMonth; i++) {
        var totalTransaction = 0;
        for (let j = 0; j < monthTransaction[i].length; j++) {
            totalTransaction += monthTransaction[i][j]; 
        }
        var currBalance = prevBalance + totalTransaction;
        totalBalance += currBalance;
        prevBalance = currBalance;
    }
    return totalBalance / daysInMonth;
}

export function getUpdatedActions(savingGoal: number, monthTransaction: number[][], monthAction: number[]): number[] {
    const averageBalance = getAverageBalance(monthTransaction)
    const balanceFromGoal = savingGoal - averageBalance;
    const updatedAction = [...monthAction];
    for (let i = 0; i < daysInMonth; i++) {
        updatedAction[i] = (balanceFromGoal * daysInMonth) / (daysInMonth - i);
    }
    return updatedAction;
}

export function roundNumber(num: number): number {
    return isNaN(num) ? 0 : Math.round(num * 100) / 100;
}
  