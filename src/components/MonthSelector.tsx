import { Button } from "react-bootstrap";
import { getDate } from "../functions/date";

interface MonthSelectorProps {
  isCurr: number;
  setIsCurr: (isCurr: number) => void;
}

export function MonthSelector({ isCurr, setIsCurr }: MonthSelectorProps) {
  const { currMonYr: currMonYr } = getDate(isCurr);

  return (
    <>
      <div className="month-selector">
        {Boolean(isCurr) && (
          <Button
            className="month-arrow"
            variant="light"
            size="sm"
            onClick={() => setIsCurr(0)}
          >
            {`<`}
          </Button>
        )}
        <Button className="month-pill" variant="dark">{currMonYr}</Button>
        {!isCurr && (
          <Button
            className="month-arrow"
            variant="light"
            size="sm"
            onClick={() => setIsCurr(1)}
          >
            {`>`}
          </Button>
        )}
      </div>
    </>
  );
}
