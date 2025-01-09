import { getDate } from "../functions/date";

export function TableHeader({ isCurr }: { isCurr: number }) {
  const { month: month } = getDate(isCurr);
  return (
    <>
      <thead>
        <th style={{ width: "20%" }}>{month}</th>
        <th style={{ width: "40%" }}>Transaction</th>
        <th style={{ width: "40%" }}>Action</th>
      </thead>
    </>
  );
}
