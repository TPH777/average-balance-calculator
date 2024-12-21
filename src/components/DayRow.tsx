import { useState } from "react";

export function TableRow() {
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const prevBalance = 0;
  const goal = 500;
  const [action, setAction] = useState<number>(prevBalance + goal);

  const handleChange = (change: number) => {
    const newBalance = prevBalance + change;
    if (newBalance < 0) {
      alert("Balance should never be below 0");
      return;
    }
    setBalance(newBalance);
    setTransactionAmount(change);
    setAction(goal - change);
  };

  return (
    <>
      <tr>
        <td>1</td>
        <td>{balance}</td>
        <td>
          <input
            id="transactionAmount"
            value={transactionAmount}
            type="number"
            className="form-control"
            onChange={(e) => handleChange(Number(e.target.value))}
          />
        </td>
        <td>{action}</td>
      </tr>
    </>
  );
}
