import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { isNumber, roundNumber } from "../functions/number";
import { getDate } from "../functions/date";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getBalanceChange } from "../functions/action";
import { sortTransactions } from "../functions/transactions";

interface InitBarProps {
  user: string | null;
  isCurr: number;
  savingGoal: string;
  setSavingGoal: (balance: string) => void;
  endBalance: string;
  setEndBalance: (balance: string) => void;
  avgBalance: string;
  setAvgBalance: (balance: string) => void;
}

export function InitBar({
  user,
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

  const handleCarryForward = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user);
      const userData = (await getDoc(userDocRef)).data();
      const prevMonthTransaction = await sortTransactions(userDocRef, 0);
      const { avgChange, endChange } = getBalanceChange(
        prevMonthTransaction,
        0
      );
      const prevEndBalance = roundNumber(userData?.endBalance[0] + endChange);
      const prevAvgBalance = roundNumber(userData?.avgBalance[0] + avgChange);
      setEndBalance(prevEndBalance.toString());
      setAvgBalance(prevAvgBalance.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="init-bar-container">
        <Row>
          <Col>
            <Form.Label className="form-label">
              End Balance of {prevMonYr}
            </Form.Label>
          </Col>
          <Col>
            <Form.Label className="form-label">
              Average Balance of {prevMonYr}
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
