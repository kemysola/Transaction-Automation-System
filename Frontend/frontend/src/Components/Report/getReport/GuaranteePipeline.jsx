import { Container, Row, Col, Stack } from "react-bootstrap";
import ChartProducts from "../ChartProducts";
import ReportRegion from "../ReportRegion";
import SectorChart from "../SectorChart";
export default function GuaranteePipeline(props) {
  return (
    <>
      <Container>
        <p style={{ fontWeight: "bold" }}>Guarantee Pipeline</p>
        <Row>
          <Col sm={6}>
            <br></br>
            <p className="pt-3 mt-3">{props?.data}</p>
          </Col>
          <Col sm={6}>
            <p
              className="text-dark pt-3 mt-3"
              style={{ fontWeight: "", textAlign: "center" }}
            >
              Pipeline By Sector
            </p>
            <SectorChart />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Stack
              gap={1}
              className="text-dark"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Region
            </Stack>

            <ReportRegion />
          </Col>
          <Col sm={6}>
            <Stack
              gap={1}
              className="text-dark"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Pipeline Distribution By Product
            </Stack>
            <ChartProducts />
          </Col>
        </Row>
      </Container>
    </>
  );
}
