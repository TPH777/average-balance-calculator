export const maxDaysInMonth = 31;

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

// To determine number of days in curr/prev month
const daysInCurrMonth = new Date(year, month + 1, 0).getDate();
const daysInPrevMonth = new Date(year, month, 0).getDate();
export function getDaysInMonth(isCurr: number): number {
  return (isCurr)? daysInCurrMonth : daysInPrevMonth;
}

// For Month and Year Formatting
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
function getPrevMonth(month: number) {
  const prevMonthNum = (month === 0)? 11 : month - 1
  return monthNames[prevMonthNum]
}
function getPrevYear(month: number) {
  const prevYear = (month === 0)? year - 1 : year
  return prevYear % 100;
}
function getPrevMonYr(month: number) {
  return getPrevMonth(month) + " " + getPrevYear(month);
}
function getPrevPrevMonYr(month: number) {
  if (month === 0) {
    return "Nov " + (year - 1) % 100 
  }
  return getPrevMonth(month-1) + " " + getPrevYear(month-1);
}
const currMonth = monthNames[month];
const currMonYr = currMonth + " " + (year % 100);
const prevMonth = getPrevMonth(month);
const prevMonYr = getPrevMonYr(month);
const prevPrevMonYr = getPrevPrevMonYr(month);
export function getDate(isCurr: number) {
  if (isCurr) {
    return {month: currMonth, currMonYr: currMonYr, prevMonYr: prevMonYr}
  }
  return {month: prevMonth, currMonYr: prevMonYr, prevMonYr: prevPrevMonYr}
}