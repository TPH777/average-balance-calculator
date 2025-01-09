import { Col, Container, Form, Row } from "react-bootstrap";
import { isNumber } from "../functions/number";
import { currMonYr, prevMonYr } from "../functions/date";

interface InitBarProps {
  savingGoal: string;
  setSavingGoal: (balance: string) => void;
  endBalance: string;
  setEndBalance: (balance: string) => void;
  avgBalance: string;
  setAvgBalance: (balance: string) => void;
}

export function InitBar({
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

  return (
    <>
      <Container className="mt-4">
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
              inputMode="decimal"
              onChange={(e) => handleInput(e.target.value, setEndBalance)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={avgBalance}
              inputMode="decimal"
              onChange={(e) => handleInput(e.target.value, setAvgBalance)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={savingGoal}
              inputMode="decimal"
              onChange={(e) => handleInput(e.target.value, setSavingGoal)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
