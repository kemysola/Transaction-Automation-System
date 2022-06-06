import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";


function NewDeals() {

  let varianceAmount = 84.6 -103.4;

  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = variance * -1;
      return (
        <span style={{ color: "green" }}>↑ ₦ {varianceAns.toFixed(1)}bn</span>
      );
    } else if (!isFinite(variance) || isFinite(variance)) {
      return ` - `;
    }

    return <span style={{ color: "red" }}>↓ ₦ {variance.toFixed(1)}bn </span>;
  }

  let variancePercent = ((varianceAmount / 84.6) * 100).toFixed(1);

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = variancePer * -1;
      return <span style={{ color: "green" }}>↑ {varianceAns}% </span>;
    } else if (!isFinite(variancePer) || isFinite(variancePer)) {
      return ` - `;
    }
    return <span style={{ color: "red" }}>↓ {variancePer}% </span>;
  }



  return (
    <React.Fragment>
      <Card style={{ padding: "10px" , background:'white' }}>
      <Row className='my-1 py-2'>
        <small style={{ fontSize: "13px" , fontWeight:'bold'}}>NEW GUARANTEES</small>
        <br/>
        <br/>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ 103.4bn
          <br/>
          <br/>
            <small
              style={{ fontSize: "11px", color: "blue", fontWeight:'bold' }}
              className=" mt-3"
            >

              ACTUAL
            </small>
            </Stack>
          </Col>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ 84.6bn
              <br/>
              <br/>
              <small
                style={{ fontSize: "11px", color: "black",fontWeight:'bold'}}
                className='mt-2'
              >
                TARGET
              </small>
            </Stack>
          </Col>
          <Col sm={4}>
          <Stack gap={0}>
            <small style={{ fontSize: "17px" }}>
             {variancePerDisplay(variancePercent)}
            </small>
            <small className="mb-3">{varianceDisplay(varianceAmount)}</small>
            <small style={{ fontSize: "11px", color: "red", fontWeight:'bold' }}>VARIANCE</small>

            </Stack>
          </Col>
</Row>
</Card>
    </React.Fragment>
  );
}

export default NewDeals;
