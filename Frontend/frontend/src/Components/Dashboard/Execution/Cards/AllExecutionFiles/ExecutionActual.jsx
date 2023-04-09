import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function ExecutionActual({
  data,
  sumTotal,
  staffFilter,
  target,
  staffList,
}) {
  const [indTarget, setIndTarget] = useState([]);
  useEffect(() => {}, [indTarget]);

  useEffect(() => {
    function filterData() {
      const filteredData = target.filter((deal) => {
        if (staffFilter.includes("All")) {
          return setIndTarget(target);
        } else if (staffFilter !== "All") {
          let filtedStaff = target.filter(
            (data) => data?.firstname + " " + data?.lastname === staffFilter
          );
          return setIndTarget(filtedStaff);
        } else {
          return setIndTarget(target);
        }
      });
      return indTarget;
    }
    filterData();
  }, [staffFilter]);

  if (indTarget.length > 0) {
    var targetValue = indTarget.reduce(function (tot, arr) {
      return tot + parseFloat(arr?.guaranteepipeline);
    }, 0);
  } else {
    var targetValue = target.reduce(function (tot, arr) {
      return tot + parseFloat(arr?.guaranteepipeline);
    }, 0);
  }

  let varianceAmount = targetValue - sumTotal;

  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = variance * -1;
      return (
        <span style={{ color: "green" }}>↑ ₦ {varianceAns.toFixed(1)}bn</span>
      );
    } else if (!isFinite(variance) || isFinite(variance)) {
      return (
        <span style={{ color: "red" }}>
          ↓ ₦ {-1 * (sumTotal - targetValue)}bn{" "}
        </span>
      );
    }
    return <span style={{ color: "red" }}>↓ ₦ {variance.toFixed(1)}bn</span>;
  }

  if (targetValue == 0) {
    let targetValue = 1;

    var varianceP = ((varianceAmount / targetValue) * 100).toFixed(1);
  } else {
    var varianceP = ((varianceAmount / targetValue) * 100).toFixed(1);
  }

  let variancePercent = varianceP;

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = variancePer * -1;
      return <span style={{ color: "green" }}>↑ {varianceAns}%</span>;
    } else {
      return <span style={{ color: "red" }}>↓ {variancePer}% </span>;
    }
  }
  return (
    <Container Fluid>
      {/* ---------------------- Actual, Target, Variance Cards ------------------------- */}
      <Row style={{ marginTop: "10px" }}>
        <Col
          sm={3}
          lg={4}
          md={12}
          className="my-1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Card style={{ width: "18rem", flex: 1, background: "white" }}>
            <Card.Body>
              <Card.Title>{`₦${sumTotal.toFixed(1)}bn`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>Actual</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={3}
          lg={4}
          md={12}
          className="my-1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Card style={{ width: "18rem", flex: 1, background: "white" }}>
            <Card.Body>
              <Card.Title>{`₦${targetValue.toFixed(1)}bn`}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>Target</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={3}
          lg={4}
          md={12}
          className="my-1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Card style={{ width: "18rem", flex: 1, background: "white" }}>
            <Card.Body>
              <Card.Title>{variancePerDisplay(variancePercent)}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {varianceDisplay(varianceAmount)}
              </Card.Subtitle>
              <Card.Text>Variance</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
