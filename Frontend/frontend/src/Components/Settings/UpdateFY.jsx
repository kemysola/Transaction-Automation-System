import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import FY from "./FYMode";


const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  margin-top: 5px;
  // border-radius: 15px;
`;

// This file takes the list of forecast and ensures the functionality to edit them in view

export default function UpdateForecast (props) {
  const [fy, setFY] = useState([]);
  const [saved, setSaved] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  useEffect(() => {
    retrieveFY();
  }, [startDate, endDate]);

  function editFY(id, fy, startDate, endDate) {
    setStartDate(startDate)
    setEndDate(endDate)

    // const editedFYList = fy.map(item => {
    // // if this set of values have the same finiacial year as the currently edited FY values
    //   if (fy === fy.fy) {
    //     //
    //     return {...item, fy_start_date: startDate, fy_end_date: endDate}
    //   }
    //   return item;
    // });
    // setFY(editedFYList);

    let data = {
      fy: fy,
      fy_start_date: startDate,
      fy_end_date: endDate,
      fy_status: "Inactive"
    };

    Services.updateFY (id, data)
      .then((res) => {
        console.log("fy values updated")
        setSaved(true)
      })
      .catch(() => {
        console.log("an error occured")
      })
  }

  const retrieveFY = () => {
    Services.getFY("''")
    .then((response) => {
        setFY(response.data.financial_years);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fyList = fy.map(item => (
    <FY 
      id={item.id}
      fy={item.fy}
      fy_start_date={item.fy_start_date}
      fy_end_date={item.fy_end_date}
      key={item.id}
      editFY={editFY}
    />
  ));

  return (
    <>
      <ListWrapper>
        <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update FY Values</b></p>
        
          <ListGroup variant="flush" >
            {fyList}
          </ListGroup>

        </Row>
    </ListWrapper>
    </>
  )
}