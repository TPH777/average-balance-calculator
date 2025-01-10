import { getBalanceChange } from "../functions/action";
import { getDate } from "../functions/date";
import { roundDown } from "../functions/number";

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
  const currEndBalance = roundDown(lastEndBalance + endChange);
  const currAvgBalance = roundDown(lastEndBalance + avgChange);
  const avgBalanceDiff = roundDown(currAvgBalance - lastAvgBalance);
  const { currMonYr: currMonYr } = getDate(isCurr);

  return (
    <tfoot>
      <tr>
        <td style={{ textAlign: "right" }} colSpan={2}>
          End Balance of {currMonYr}
        </td>
        <td>{currEndBalance}</td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }} colSpan={2}>
          Average Balance of {currMonYr}
        </td>
        <td>{currAvgBalance}</td>
      </tr>
      <tr>
        <td style={{ textAlign: "right" }} colSpan={2}>
          Change in Average Balance of {currMonYr}
        </td>
        <td>{avgBalanceDiff}</td>
      </tr>
    </tfoot>
  );
}
