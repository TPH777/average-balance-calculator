import { getBalanceChange } from "../functions/action";
import { roundNumber } from "../functions/number";

interface TableFooterProps {
  lastEndBalance: number;
  lastAvgBalance: number;
  monthTransaction: number[][];
}

export function TableFooter({
  lastEndBalance,
  lastAvgBalance,
  monthTransaction,
}: TableFooterProps) {
  const { avgChange: avgChange, endChange: endChange } =
    getBalanceChange(monthTransaction);
  const currEndBalance = roundNumber(lastEndBalance + endChange);
  const currAvgBalance = roundNumber(lastEndBalance + avgChange);
  const avgBalanceDiff = roundNumber(currAvgBalance - lastAvgBalance);

  return (
    <>
      <thead>
        <th />
        <th />
        <th>----------------------------------------</th>
      </thead>
      <thead>
        <th />
        <th />
        <th>End Balance: {currEndBalance}</th>
      </thead>
      <thead>
        <th />
        <th />
        <th>Average Balance: {currAvgBalance}</th>
      </thead>
      <thead>
        <th />
        <th />
        <th>Average Balance Change: {avgBalanceDiff}</th>
      </thead>
    </>
  );
}
