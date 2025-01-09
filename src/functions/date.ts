const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

export const daysInCurrMonth = new Date(year, month + 1, 0).getDate();
export const daysInPrevMonth = new Date(year, month, 0).getDate();

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
export const currMonth = monthNames[month];
export const currMonYr = currMonth + " " + (year % 100);

const prevMonth = (month === 0)? 11 : month - 1
const prevYear = (year - 1) % 100  
export const prevMonYr = monthNames[prevMonth] + " " + prevYear;