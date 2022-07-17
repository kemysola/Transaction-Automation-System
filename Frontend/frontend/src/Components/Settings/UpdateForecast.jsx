import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Forecast from "./ForecastMode";


const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  margin-top: 5px;
  // border-radius: 15px;
`;

// This file takes the list of forecast and ensures the functionality to edit them in view

export default function UpdateForecast (props) {
  const [forecast, setForecast] = useState([]);
  const [saved, setSaved] = useState(false)
  
  useEffect(() => {
    retrieveForecast();
  }, []);

  function editForecast(id, newForecastValues) {
    const editedForecastList = forecast.map(item => {
    // if this set of values have the same ID as the currently edited forecast values
      if (id === forecast.projectionid) {
        //
        return {...item, forecast: newForecastValues}
      }
      return item;
    });
    setForecast(editedForecastList);

    let data = {
      projectionyear: newForecastValues.projectionyear,
      cumulativegrowth: newForecastValues.cumulativegrowth,
      newdeals: newForecastValues.newdeals
    };

    Services.updateForecast (id, data)
      .then((res) => {
        console.log("forecast updated")
        setSaved(true)
      })
      .catch(() => {
        console.log("an error occured")
      })
  }


  const retrieveForecast = () => {
    Services.getForecast()
    .then((response) => {
        setForecast(response.data.forecast);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const forecastList = forecast
  .map(item => (
    <Forecast 
      id={item.projectionid}
      projectionyear={item.projectionyear}
      cumulativegrowth={item.cumulativegrowth}
      newdeals={item.newdeals}
      key={item.projectionid}
      editForecast={editForecast}
    />
  ));

  return (
    <>
      <ListWrapper>
        <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update Forecast Values</b></p>
        
          <ListGroup variant="flush" >
            {forecastList}
          </ListGroup>

        </Row>
    </ListWrapper>
    </>
  )
}