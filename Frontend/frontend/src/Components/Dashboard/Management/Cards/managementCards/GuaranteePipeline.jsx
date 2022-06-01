import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";
function GuaranteePipeline() {
  const [guarPipeline, setGuarPipeline] = useState([]);
  const [actual, setActual] = useState([]);
  const [region, setRegion] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    Service.getAllStaff()
      .then((res) => {
        //console.log(res.data.staff);
        setData(res.data.staff);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Service.getAllDeals()
      .then((res) => {
        console.log(res.data.deals);
        setActual(res.data.deals);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    Service.getIndustry()
      .then((res) => {
        setIndustry(res.data.industry.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Service.getProduct()
      .then((res) => {
        //console.log(res.data.product.length);
        setProduct(res.data.product.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    Service.getRegion()
      .then((res) => {
        //console.log(res.data.region.length);
        setRegion(res.data.region.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get green and amber actual values and variances
  var amber = actual.reduce(function (filtered, arr) {
    if (arr.deal_category === "Yellow") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var green = actual.reduce(function (filtered, arr) {
    if (arr.deal_category === "Green") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var amberTotal = amber.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var greenTotal = green.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var targetValue = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.guaranteepipeline);
  }, 0);

  var greenV = data.reduce(function (tot, arr) {
    return tot + Number(arr.greentransaction);
  }, 0);

  var amberValue = data.reduce(function (tot, arr) {
    return tot + Number(arr.ambertransaction);
  }, 0);

  var greenAndAmberVariance = 0;
  //green and amber total
  var amber = actual.reduce(function (filtered, arr) {
    if (arr.deal_category === "Yellow") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  var green = actual.reduce(function (filtered, arr) {
    if (arr.deal_category === "Green") {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  //**green total*/
  var amberTotal = amber.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var greenTotal = green.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var totalGreenAndAmberDeals = greenTotal + amberTotal;

  var actuallvalue = actual.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  let varianceAmount = targetValue - actuallvalue;
  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = (variance * -1)
      return <span style={{color: 'green'}}>↑ {(varianceAns).toFixed(1)}bn</span>;
    }
    else if (!isFinite(variance) || isFinite(variance)){
      return <span style={{color: 'red'}}>↓ {-1 * (actuallvalue - targetValue)}bn </span>;
    }
    
    return <span style={{color: 'red'}}>↓ {(variance).toFixed(1)}bn </span>;
  }

  // function varianceDisplay(variance) {
  //   if (variance < 1) {
  //     let varianceAns = variance * -1;
  //     return <span style={{color: 'green'}}>↑ {varianceAns}%</span>;

  //   }else {
  //     return <span style={{color: 'red'}}>↓ {variance}% </span>;
  //   }
  // }


  if (targetValue == 0) {
    let targetValue = 1;
    
    var varianceP = (( varianceAmount / targetValue) * 100).toFixed(1);
  } else  {
    var varianceP = (( varianceAmount / targetValue) * 100).toFixed(1);
  }

  let variancePercent = varianceP

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = (variancePer * -1)
      return <span style={{color: 'green'}}>↑ {varianceAns}%</span>;
    // } else if(!isFinite(variancePer) || isFinite(variancePer)){
    //   return !isFinite(((-1 * (sumTotal - targetValue)/ sumTotal) * 100).toFixed(1)) ?<span style={{color: 'red'}}> 0%</span>: <span style={{color: 'red'}}>↓ {((-1 * (sumTotal - targetValue)/ sumTotal) * 100).toFixed(1)}%</span>;
    } else {
    return <span style={{color: 'red'}}>↓ {variancePer}% </span>;
  }
}



  return (
    <React.Fragment>
      
      <Card  style={{padding:'10px'}}>
        <Row className='my-1'>
        <small style={{ fontSize: "13px" , fontWeight:'bold'}}>GUARANTEE PIPELINE</small>
<br/>
<br/>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ {actuallvalue.toFixed(2)} bn
            <br/>
            <small
              style={{ fontSize: "11px", color: "blue", fontWeight:'bold' }}
              className=" mt-3"
            >
              <br/>
              ACTUAL
            </small>
            <br />
            </Stack>

          </Col>
          <Col sm={4}>
          <Stack gap={0} className="d-flex justify-content-center">
          ₦ {targetValue.toFixed(2) }bn
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
            ₦ {variancePerDisplay(variancePercent)}
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

export default GuaranteePipeline;
