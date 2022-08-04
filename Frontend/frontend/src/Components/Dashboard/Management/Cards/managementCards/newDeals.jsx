import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";


function NewDeals() {

  // **************************************************** Store data in a useState hook *******************************

  const [currentForecast, setCurrentForecast] = useState([])
  const [nextForecast, setNextForecast] = useState("")
  const [closedDeal, setClosedDeal] = useState([]);
  const year = new Date().getFullYear();


  // ****************************************** ComponentDidMouunt using useEffect hook *******************************

  useEffect(() => {
    retrieveForecast();
  }, []);


// ******************************************  Axios , get forecast, transactions  ****************************************

  
  const retrieveForecast = async() => {
    await Service.getForecast()
      .then((response) => {
        setCurrentForecast(response.data.forecast[0]);
      })
      .catch((e) => {
      });
  }

  
  useEffect(() => {
    Service.getAllDeals()
      .then((res) => {
        setClosedDeal(res.data.deals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // ******************************************  Variance calculation ****************************************

  let targetValue = 0
  targetValue = +currentForecast.newdeals

  var actual = closedDeal.reduce(function (filtered, arr) {
    if (arr.closed === true) {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  // ******************************************  Calculate Actual Forecast Values  ****************************************

  let actualForecast = actual.reduce(function (tot, arr){
    return tot + parseFloat(arr)
  }, 0)


  // ******************************************  Calculate the variance   **************************************************


  let varianceAmount = targetValue  - actualForecast;
  
  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = variance * -1;
      return (
        <span style={{ color: "green" }}>↑ ₦ {varianceAns.toFixed(1)}bn</span>
      );
    } else if (!isFinite(variance) || isFinite(variance)) {
      return <span style={{color: 'red'}}>↓ ₦ {-1 * (actualForecast - targetValue).toFixed(1)}bn </span>;
    }

    return <span style={{ color: "red" }}>↓ ₦ {variance.toFixed(1)}bn </span>;
  }

  if (targetValue  == 0) {
    let targetValue  = 1;
    
    var varianceP = (( varianceAmount / targetValue ) * 100).toFixed(1);
  } else  {
    var varianceP = (( varianceAmount / targetValue ) * 100).toFixed(1);
  }

  let variancePercent = varianceP

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = variancePer * -1;
      return <span style={{ color: "green" }}>↑ {varianceAns}% </span>;
    }
    return <span style={{ color: "red" }}>↓ {variancePer}% </span>;
  }



  return (
    <React.Fragment>
      <Card style={{ padding: "10px" , background:'white' }}>
      <Row className='my-2 py-2'>
        <small style={{ fontSize: "13px" , fontWeight:'bold'}}>NEW GUARANTEES</small>
        <br/>
        <br/>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ {actualForecast}bn
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
          ₦ {targetValue.toFixed(0)}bn
              <br/>
              <br/>
              <small
                style={{ fontSize: "11px", color: "black",fontWeight:'bold'}}
                className='mt-2'
              >
                TARGET
              </small>
              {/* <small  style={{ fontSize: "10px", color: "black"}}>1.5x target of {year} </small> */}
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
