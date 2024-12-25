export interface TableRowProps {
  index: number;
  monthTransaction: number[];
  setMonthTransaction: (transaction: number[]) => void;
  monthAction: number[];
}

export function TableRows({
  index,
  monthTransaction,
  setMonthTransaction,
  monthAction,
}: TableRowProps) {
  const handleTransaction = (newTransaction: number) => {
    const updatedTransaction = [...monthTransaction];
    updatedTransaction[index] = newTransaction;
    setMonthTransaction(updatedTransaction);
  };

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            value={monthTransaction[index]}
            type="tel"
            pattern="-?[0-9]+"
            className="form-control"
            onChange={(transaction) =>
              handleTransaction(Number(transaction.target.value))
            }
          />
        </td>
        <td>{Math.ceil(monthAction[index] * 100) / 100}</td>
      </tr>
    </>
  );
}
