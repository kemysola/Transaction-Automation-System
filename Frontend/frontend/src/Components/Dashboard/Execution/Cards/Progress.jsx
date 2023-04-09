import { Container, Row, Col } from "react-bootstrap";
import FilterTable from "./FilterTable";

export default function Progress() {
  return (
    <>
      <Container
        Fluid
        style={{ marginLeft: "0.22rem ", borderRadius: "5px" }}
        className="bg-light"
      >
        <Row className="d-flex justify-content-between">
          <Col sm={6} lg={8}>
            <p class="animate__animated animate__pulse pt-2">
              <b>Execution Summary</b>
            </p>
          </Col>
        </Row>
        <FilterTable />
      </Container>
    </>
  );
}
