import { getBalanceChange } from "../functions/action";
import { roundNumber } from "../functions/number";

interface TableFooterProps {
  isCurr: number;
  lastEndBalance: number;
  lastAvgBalance: number;
  monthTransaction: number[][];
}

export function TableFooter({
  isCurr,
  lastEndBalance,
  lastAvgBalance,
  monthTransaction,
}: TableFooterProps) {
  const { avgChange, endChange } = getBalanceChange(monthTransaction, isCurr);
  const currEndBalance = roundNumber(lastEndBalance + endChange);
  const currAvgBalance = roundNumber(lastEndBalance + avgChange);
  const avgBalanceDiff = roundNumber(currAvgBalance - lastAvgBalance);

  return (
    <tfoot>
      <tr>
        <td colSpan={3}>End Balance: {currEndBalance}</td>
      </tr>
      <tr>
        <td colSpan={3}>Average Balance: {currAvgBalance}</td>
      </tr>
      <tr>
        <td colSpan={3}>Average Balance Change: {avgBalanceDiff}</td>
      </tr>
    </tfoot>
  );
}
