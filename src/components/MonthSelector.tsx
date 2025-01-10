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
      <div className="mb-3">
        {Boolean(isCurr) && (
          <Button
            className="me-2"
            variant="outline-dark"
            size="sm"
            onClick={() => setIsCurr(0)}
          >
            {`<`}
          </Button>
        )}
        <Button variant="dark">{currMonYr}</Button>
        {!isCurr && (
          <Button
            className="ms-2"
            variant="outline-dark"
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
