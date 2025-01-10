import { getDate } from "../functions/date";

export function TableHeader({ isCurr }: { isCurr: number }) {
  const { month: month } = getDate(isCurr);
  return (
    <>
      <thead>
        <th style={{ width: "10%" }}>{month}</th>
        <th style={{ width: "60%" }}>Transaction</th>
        <th style={{ width: "30%" }}>Action</th>
      </thead>
    </>
  );
}
