import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";
function GuaranteePipeline() {
  
  // ******************************************  use state hook to store state ****************************************
  const [guarPipeline, setGuarPipeline] = useState([]);
  const [actual, setActual] = useState([]);
  const [region, setRegion] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [currentForecast, setCurrentForecast] = useState([])
  const [nextForecast, setNextForecast] = useState("")

  const year = new Date().getFullYear();
  const nextYear = new Date().getFullYear() + 1;

  // ******************************************  use Effect Hook : Component Did mount and update ***********************

  useEffect(() => {
    retrieveForecast();
  }, []);


// ******************************************  Axios call to get forecast *************************************************


  const retrieveForecast = async() => {
    await Service.getForecast()
      .then((response) => {
        setCurrentForecast(response.data.forecast[0]);
        setNextForecast(response.data.forecast[1])
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // ************************************** Use Effect hook  and Axios: component did mount, receive and update ********************

  // ********************************** Axios - get request to get all staff, all transactions, industry, product, region **********



  useEffect(() => {
    Service.getAllStaff()
      .then((res) => {

        setData(res.data.staff);
      })
      .catch((err) => {
       
      });
  }, []);

  useEffect(() => {
    Service.getAllDeals()
      .then((res) => {
        setActual(res.data.deals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Service.getIndustry()
      .then((res) => {
        setIndustry(res.data.industry.length);
      })
      .catch((err) => {
       
      });
  }, []);

  useEffect(() => {
    Service.getProduct()
      .then((res) => {
        setProduct(res.data.product.length);
      })
      .catch((err) => {
        
      });
  }, []);
  useEffect(() => {
    Service.getRegion()
      .then((res) => {
        setRegion(res.data.region.length);
      })
      .catch((err) => {
        
      });
  }, []);



  //************************************************ Get green and amber actual values and variances  ********************
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


  var greenV = data.reduce(function (tot, arr) {
    return tot + Number(arr.greentransaction);
  }, 0);

  var amberValue = data.reduce(function (tot, arr) {
    return tot + Number(arr.ambertransaction);
  }, 0);

  var greenAndAmberVariance = 0;


  //**************************************** Get green and amber total **********************************************************
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


  //****************************************************** Green total *********************************************************
  var amberTotal = amber.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  var greenTotal = green.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);



  //********************************************* Get total Green And Amber Deals = greenTotal + amberTotal ***********************

  // ******************************************  GGet the actual value  ***********************************************************

  var actuallvalue = actual.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);


  // ******************************************  Forecast Projection Analysis ****************************************************

  let newGuranteecurrentForecast = +currentForecast.newdeals
  let newGuranteenextForecast = +nextForecast.newdeals

  let forecastValue = 0
  forecastValue = (newGuranteenextForecast + newGuranteecurrentForecast) * 1.5

  let targetValue = forecastValue
  let varianceAmount = targetValue - actuallvalue;
  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = (variance * -1)
      return <span style={{color: 'green'}}>↑ ₦ {(varianceAns).toFixed(1)}bn</span>;
    }
    else if (!isFinite(variance) || isFinite(variance)){
      return <span style={{color: 'red'}}>↓ ₦ {-1 * (actuallvalue - targetValue).toFixed(1)}bn </span>;
    }
    
    return <span style={{color: 'red'}}>↓ ₦ {(variance).toFixed(1)}bn </span>;
  }

  
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
              style={{ fontSize: "11px", color: "black", fontWeight:'bold' }}
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
          ₦ {targetValue.toFixed(1)}bn
              <br/>
              <br/>
              <small
                style={{ fontSize: "11px", color: "black",fontWeight:'bold'}}
                className='mt-2'
              >
                TARGET
              </small>
              <small  style={{ fontSize: "10px", color: "black"}}>1.5x target of {year} - {nextYear} </small>

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

export default GuaranteePipeline;
