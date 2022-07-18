import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Level from "./LevelMode";


const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  margin-top: 5px;
  margin-bottom: 2px;
  // border-radius: 15px;
`;

// This file takes the list of levels and ensures the functionality to edit them in view

export default function UpdateLevel (props) {
  const [level, setLevel] = useState([]);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  
  useEffect(() => {
    retrieveLevel();
  }, [name]);

  function editLevel(id, newLevel) {
    setName(newLevel)
    
    const editedLevelList = level.map(item => {
    // if this level has the same ID as the curent edited level
      if (id === level.levelid) {
        return {...item, level: newLevel}
      }
      return item;
    });
    setLevel(editedLevelList);

    let data = {
      level: newLevel
    };

    Services.updateLevel(id, data)
      .then((res) => {
        console.log("level updated")
        setSaved(true)
      })
      .catch(() => {
        console.log("an error occured")
      })
  }


  const retrieveLevel = () => {
    Services.getLevel()
    .then((response) => {
        setLevel(response.data.levels);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const levelList = level
  .map(item => (
    <Level 
      id={item.levelid}
      level={item.stafflevel}
      key={item.levelid}
      editLevel={editLevel}
    />
  ));

  return (
    <>
      <ListWrapper>
        <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update Level</b></p>

          <ListGroup variant="flush" >
            {levelList}
          </ListGroup>

        </Row>
    </ListWrapper>
    </>
  )
}