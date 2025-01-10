import { Container, Row } from "react-bootstrap";
import logo from "../pictures/logo.jpg";

export function Header() {
  return (
    <Container>
      <Row>
        <h1 className="site-title">
          <img src={logo} className="logo-img" />
          Average Balance Calculator
        </h1>
      </Row>
    </Container>
  );
}
