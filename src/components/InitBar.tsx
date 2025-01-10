import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { isNumber, roundDown } from "../functions/number";
import { getDate } from "../functions/date";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getBalanceChange } from "../functions/action";
import { sortTransactions } from "../functions/transactions";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (input: string, setter: (val: string) => void) => {
    if (isNumber(input)) {
      setter(input);
    }
  };

  const handleCarryForward = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userDocRef = doc(db, "users", user);
      const userData = (await getDoc(userDocRef)).data();
      const prevMonthTransaction = await sortTransactions(userDocRef, 0);
      const { avgChange, endChange } = getBalanceChange(
        prevMonthTransaction,
        0
      );
      const prevEndBalance = roundDown(userData?.endBalance[0] + endChange);
      const prevAvgBalance = roundDown(userData?.avgBalance[0] + avgChange);
      setEndBalance(prevEndBalance.toString());
      setAvgBalance(prevAvgBalance.toString());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
        {user && Boolean(isCurr) && (
          <Row className="mt-3">
            <div className="gap-2">
              <Button
                size="sm"
                variant="outline-light"
                onClick={handleCarryForward}
              >
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <>Carry forward from {prevMonYr}</>
                )}
              </Button>
            </div>
          </Row>
        )}
      </Container>
    </>
  );
}
