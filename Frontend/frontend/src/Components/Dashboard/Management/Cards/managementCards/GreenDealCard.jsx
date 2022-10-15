import React, { useEffect, useState, useContext } from "react";
import Service from "../../../../../Services/Service";
import TitleContext from '../../../../../context/TitleContext';
import { Row, Col, Card, Stack, Container } from "react-bootstrap";
function GreenDealCard() {
  const { filteredStore, addFtYear} = useContext(TitleContext)
  const [guarPipeline, setGuarPipeline] = useState([]);
  const [actual, setActual] = useState([]);
  const [region, setRegion] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState([]);

  const [currentForecast, setCurrentForecast] = useState([])
  const year = new Date().getFullYear();
  useEffect(() => {
    retrieveForecast();
  }, []);

  
  const retrieveForecast = async() => {
    await Service.getForecast()
      .then((response) => {
        setCurrentForecast(response.data.forecast[0]);
      })
      .catch((e) => {
       
      });
  }

  useEffect(async () => {
    await Service.getAllStaff()
      .then((res) => {
        
        setData(res.data.staff);
      })
      .catch((err) => {
       
      });
  }, []);

  useEffect(async () => {
    await Service.getAllDeals(filteredStore)
      .then((res) => {
        
        setActual(res.data.deals);
      })
      .catch((err) => {
       
      });
  }, [filteredStore]);

  useEffect(async () => {
    await Service.getIndustry()
      .then((res) => {
        setIndustry(res.data.industry.length);
      })
      .catch((err) => {
       
      });
  }, []);

  useEffect(async () => {
    await Service.getProduct()
      .then((res) => {
        
        setProduct(res.data.product.length);
      })
      .catch((err) => {
       
      });
  }, []);
  useEffect(async () => {
    await Service.getRegion()
      .then((res) => {
        setRegion(res.data.region.length);
      })
      .catch((err) => {
     
      });
  }, []);

  // magement metrics for green deal
  
  let greendeal = +currentForecast.newdeals

  let greendealForecastValue = 0
  greendealForecastValue = (greendeal) * 1.5 * 0.7

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

  let varianceAmount = greendealForecastValue - greenTotal;
 
  function varianceDisplay(variance) {
    if (variance < 1) {
      let varianceAns = (variance * -1)
      return <span style={{color: 'green'}}>↑ ₦ {(varianceAns).toFixed(2)}bn</span>;
    }
    else if (!isFinite(variance) || isFinite(variance)){
      return <span style={{color: 'red'}}>↓ ₦ { (greendealForecastValue - greenTotal).toFixed(2)}bn </span>;
    }
    
    return <span style={{color: 'red'}}>↓ ₦ {(variance).toFixed(2)}bn </span>;
  }

  // let variancePercent = ((varianceAmount / greendealForecastValue) * 100).toFixed(2);
  if (greendealForecastValue == 0) {
    let greendealForecastValue = 1;
    
    var varianceP = (( varianceAmount /greendealForecastValue) * 100).toFixed(2);
  } else  {
    var varianceP = (( varianceAmount /greendealForecastValue) * 100).toFixed(2);
  }

  let variancePercent = varianceP

  function variancePerDisplay(variancePer) {
    if (variancePer < 1) {
      let varianceAns = (variancePer * -1)
      return <span style={{color: 'green'}}>↑ {varianceAns}%</span>;
    // } else if(!isFinite(variancePer) || isFinite(variancePer)){
    //   return !isFinite(((-1 * (sumTotal - targetValue)/ sumTotal) * 100).toFixed(2)) ?<span style={{color: 'red'}}> 0%</span>: <span style={{color: 'red'}}>↓ {((-1 * (sumTotal - targetValue)/ sumTotal) * 100).toFixed(2)}%</span>;
    } else {
    return <span style={{color: 'red'}}>↓ {variancePer}% </span>;
  }
}

  return (
    <React.Fragment>
      <Card style={{ padding: "10px" , background:'white' }}>
        <Row className='py-2 my-1'>
        <small style={{ fontSize: "13px", fontWeight:'bold' }}>GREEN DEALS</small>
        <br/>
        <br/>
          <Col sm={4}>
            <Stack gap={0} className="d-flex justify-content-center">
            ₦ {greenTotal.toFixed(2)}bn
              <br/>
              <br/>
              <small
                style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}
                className=" mt-3"
              >
                ACTUAL
              </small>
            </Stack>
          </Col>
          <Col sm={4}>
            <Stack gap={0} className="d-flex justify-content-center">
            ₦ {greendealForecastValue.toFixed(2)}bn
              <small
                style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}
                className="mt-2"
              >
                <br />
                <br/>
                TARGET
              </small>
              <small  style={{ fontSize: "10px", color: "black"}}>70% of Green and Amber Deals {year}  </small>
            </Stack>
          </Col>
          <Col sm={4}>
            <Stack gap={0}>
              <small style={{ fontSize: "17px" }}>
               {variancePerDisplay(variancePercent)}
              </small>
              <small className="mb-3">{varianceDisplay(varianceAmount)}</small>
              <small
                style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}
              >
                VARIANCE
              </small>
            </Stack>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
}

export default GreenDealCard;
