import { currMonth } from "../functions/date";

export function TableHeader() {
  return (
    <>
      <thead>
        <tr>
          <th style={{ width: "20%" }}>{currMonth}</th>
          <th style={{ width: "40%" }}>Transaction</th>
          <th style={{ width: "40%" }}>Action</th>
        </tr>
      </thead>
    </>
  );
}
