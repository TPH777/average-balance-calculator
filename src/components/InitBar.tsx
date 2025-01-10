import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
  const { currMonYr: currMonYr, prevMonYr: prevMonYr } = getDate(isCurr);

  const handleInput = (input: string, setter: (val: string) => void) => {
    if (isNumber(input)) {
      setter(input);
    }
  };

  const handleCarryForward = () => {};

  return (
    <>
      <Container className="init-bar-container">
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
        <Row className="mt-3">
          <Col />
          <Col>
            <div className="d-grid gap-2">
              <Button
                size="sm"
                variant="outline-light"
                onClick={handleCarryForward}
              >
                Carry forward from {prevMonYr}
              </Button>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
}
