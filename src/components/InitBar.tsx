import { Col, Container, Form, Row } from "react-bootstrap";
import { isNumber } from "../functions/number";
import { getDate } from "../functions/date";

interface InitBarProps {
  isCurr: number;
  savingGoal: string;
  setSavingGoal: (balance: string) => void;
  endBalance: string;
  setEndBalance: (balance: string) => void;
  avgBalance: string;
  setAvgBalance: (balance: string) => void;
}

export function InitBar({
  isCurr,
  savingGoal,
  setSavingGoal,
  endBalance,
  setEndBalance,
  avgBalance,
  setAvgBalance,
}: InitBarProps) {
  const handleInput = (input: string, setter: (val: string) => void) => {
    if (isNumber(input)) {
      setter(input);
    }
  };

  const { currMonYr: currMonYr, prevMonYr: prevMonYr } = getDate(isCurr);

  return (
    <>
      <Container className="mt-4 init-bar-container">
        <Row>
          <Col>
            <Form.Label className="form-label">
              End Balance in {prevMonYr}
            </Form.Label>
          </Col>
          <Col>
            <Form.Label className="form-label">
              Average Balance in {prevMonYr}
            </Form.Label>
          </Col>
          <Col>
            <Form.Label className="form-label">
              Saving Goal for {currMonYr}
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={endBalance}
              onChange={(e) => handleInput(e.target.value, setEndBalance)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={avgBalance}
              onChange={(e) => handleInput(e.target.value, setAvgBalance)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={savingGoal}
              onChange={(e) => handleInput(e.target.value, setSavingGoal)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
