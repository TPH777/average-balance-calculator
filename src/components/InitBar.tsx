import { Form, Table } from "react-bootstrap";

interface InitBarProps {
  initialBalance: number;
  setInitialBalance: (balance: number) => void;
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  savingGoal: number;
  setSavingGoal: (goal: number) => void;
}

export function InitBar({
  initialBalance,
  setInitialBalance,
  monthBalance,
  setMonthBalance,
  savingGoal,
  setSavingGoal,
}: InitBarProps) {
  const handleBalance = (newInitialBalance: number) => {
    if (newInitialBalance < 0) {
      alert("Balance should never be below 0");
      return;
    }
    const changeInInitialBalance = newInitialBalance - initialBalance;
    const updatedBalance = [...monthBalance];
    for (let i = 0; i < 31; i++) {
      updatedBalance[i] = monthBalance[i] + changeInInitialBalance;
    }
    setMonthBalance(updatedBalance);
    setInitialBalance(newInitialBalance);
  };

  const handleGoal = (goal: number) => {
    if (goal < 0) {
      alert("Balance should never be below 0");
      return;
    }
    setSavingGoal(goal);
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th className="initBar">Intial Balance</th>
          <th className="intiBar">Saving Goal</th>
        </tr>
      </thead>
      <tbody>
        <td>
          <Form.Control
            type="number"
            placeholder="Intial Balance"
            value={initialBalance}
            onChange={(e) => handleBalance(Number(e.target.value))}
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="number"
            placeholder="Saving Goal"
            value={savingGoal}
            onChange={(e) => handleGoal(Number(e.target.value))}
          ></Form.Control>
        </td>
      </tbody>
    </Table>
  );
}
