import { daysInMonth } from "./date";

const getAverageBalance = (monthTransaction: number[]) => {
    var prevBalance = 0;
    var totalBalance = 0;
    for (let i = 0; i < daysInMonth; i++) {
        var currBalance = prevBalance + monthTransaction[i];
        totalBalance += currBalance;
        prevBalance = currBalance;
    }
    return totalBalance / daysInMonth;
}

export const getUpdatedActions = (savingGoal: number, monthTransaction: number[], monthAction: number[]) => {
    const averageBalance = getAverageBalance(monthTransaction)
    const balanceFromGoal = savingGoal - averageBalance;
    const updatedAction = [...monthAction];
    for (let i = 0; i < daysInMonth; i++) {
        updatedAction[i] = (balanceFromGoal * daysInMonth) / (daysInMonth - i);
    }
    return updatedAction;
}

export const roundNumber = (number: number) => {
    return Math.ceil(number * 100) / 100;
}