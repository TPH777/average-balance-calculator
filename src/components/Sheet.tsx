import Table from "react-bootstrap/Table";
import { TableRow } from "./DayRow";

export function Sheet() {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Balance</th>
          <th>Transaction</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
      </tbody>
    </Table>
  );
}
