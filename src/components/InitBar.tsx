import { Form, Table } from "react-bootstrap";

interface InitBarProps {
  monthBalance: number[];
  setMonthBalance: (balance: number[]) => void;
  savingGoal: number;
  setSavingGoal: (goal: number) => void;
}

export function InitBar({
  monthBalance,
  setMonthBalance,
  savingGoal,
  setSavingGoal,
}: InitBarProps) {
  const handleBalance = (initialBalance: number) => {
    if (initialBalance < 0) {
      alert("Balance should never be below 0");
      return;
    }
    const updatedBalance = [...monthBalance];
    updatedBalance[0] = initialBalance;
    setMonthBalance(updatedBalance);
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
            value={monthBalance[0]}
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
