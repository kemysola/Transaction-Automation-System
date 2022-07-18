import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Industry from "./IndustryMode";


const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  margin-top: 5px;
  // border-radius: 15px;
`;

// This file takes the list of industries and ensures the functionality to edit them in view

export default function UpdateIndustry (props) {
  const [industries, setIndustries] = useState([]);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  
  useEffect(() => {
    retrieveIndustry();
  }, [name]);

  function editIndustry(id, newIndustryName) {
    setName(newIndustryName);
    
    const editedIndustryList = industries.map(item => {
    // if this industry has the same ID as the currently edited industry
      if (id === industries.industryid) {
        //
        return {...item, industry: newIndustryName}
      }
      return item;
    });
    setIndustries(editedIndustryList);

    let data = {
      industry: newIndustryName
    };

    Services.updateIndustry(id, data)
      .then((res) => {
        setSaved(true)
      })
      .catch(() => {
        console.log("an error occured")
      })
  }


  const retrieveIndustry = () => {
    Services.getIndustry()
    .then((response) => {
        setIndustries(response.data.industry);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const industryList = industries
  .map(item => (
    <Industry 
      id={item.industryid}
      industry={item.industry}
      key={item.industryid}
      editIndustry={editIndustry}
    />
  ));

  return (
    <>
      <ListWrapper>
        <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update Industry</b></p>
        
          <ListGroup variant="flush" >
            {industryList}
          </ListGroup>

        </Row>
    </ListWrapper>
    </>
  )
}