const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

export const daysInCurrMonth = new Date(year, month + 1, 0).getDate();
export const daysInPrevMonth = new Date(year, month, 0).getDate();
