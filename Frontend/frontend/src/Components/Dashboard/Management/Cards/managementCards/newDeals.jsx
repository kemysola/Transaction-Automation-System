import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";


function NewDeals() {

  const [forecast2022, setForecast2022] = useState([])
  const [forecast2023, setForecast2023] = useState("")

  useEffect(() => {
    retrieveForecast();
  }, []);

  
  const retrieveForecast = async() => {
    await Service.getForecast()
      .then((response) => {
        setForecast2022(response.data.forecast[0]);
        setForecast2023(response.data.forecast[1])
      })
      .catch((e) => {
        console.log(e);
      });
  }

  let newGuranteeForecast2022 = +forecast2022.newdeals
  let newGuranteeForecast2023 = +forecast2023.newdeals

  let forecastValue = 0
  forecastValue = (newGuranteeForecast2023 + newGuranteeForecast2022) * 1.5

  let varianceAmount = forecastValue - 103.4;
  
  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = variance * -1;
      return (
        <span style={{ color: "green" }}>↑ ₦ {varianceAns.toFixed(1)}bn</span>
      );
    } else if (!isFinite(variance) || isFinite(variance)) {
      return <span style={{color: 'red'}}>↓ ₦ {-1 * (103.4 - forecastValue)}bn </span>;
    }

    return <span style={{ color: "red" }}>↓ ₦ {variance.toFixed(1)}bn </span>;
  }

  if (forecastValue == 0) {
    let forecastValue = 1;
    
    var varianceP = (( varianceAmount / forecastValue) * 100).toFixed(1);
  } else  {
    var varianceP = (( varianceAmount / forecastValue) * 100).toFixed(1);
  }

  let variancePercent = varianceP
  // let variancePercent = ((varianceAmount / forecastValue) * 100).toFixed(1);

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = variancePer * -1;
      return <span style={{ color: "green" }}>↑ {varianceAns}% </span>;
    // } else if (!isFinite(variancePer) || isFinite(variancePer)) {
    //   return ` - `;
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
            ₦ 103.4 bn
          <br/>
          <br/>
            <small
              style={{ fontSize: "11px", color: "black", fontWeight:'bold' }}
              className=" mt-3"
            >

              ACTUAL
            </small>
            </Stack>
          </Col>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ {forecastValue.toFixed(0)} bn
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
            <small style={{ fontSize: "11px", color: "black", fontWeight:'bold' }}>VARIANCE</small>

            </Stack>
          </Col>
</Row>
</Card>
    </React.Fragment>
  );
}

export default NewDeals;
