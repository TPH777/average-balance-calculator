import { Col, Row } from "react-bootstrap";
import { AccountButton } from "./AccountButton";

interface TitleBarProps {
  user: string | null;
  setUser: (userId: string | null) => void;
}

export function TitleBar({ user, setUser }: TitleBarProps) {
  return (
    <Row>
      <Col>
        <text>Average Balance Calculator</text>
      </Col>
      <Col>
        <AccountButton user={user} setUser={setUser} />
      </Col>
    </Row>
  );
}
