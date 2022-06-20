import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import { FiEdit, FiSave } from 'react-icons/fi'

const ListWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  // border-radius: 15px;
`;

export default function Industry () {
  const [industries, setIndustries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    retrieveIndustry();
  }, []);

  const handleEdit = (id) => {
    console.log("industry id is", id)
    setIsEditing(true)
  }

  const handleSave = (id) => {
    console.log("industry id is", id)
    setIsEditing(false)
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
  return (
    <>
      <ListWrapper>
        <Container className="bg-light py-1" style={{ borderRadius: 10 + 'px'}}>
          <p style={{fontSize: "13px"}}><b>Update Industry</b></p>
          <ListGroup variant="flush" >
            {industries.map((item) => (
              <ListGroup.Item
                key={item.industryid}
                style={{width: "80%", cursor: "pointer"}}
              >
                <Row className="d-flex justify-content-between">
                  <Col md={8}>
                    <span>
                      {item.industry}
                    </span>
                  </Col>
                  <Col md={3}>
                    {isEditing ? (
                      <FiSave onClick={() => handleSave(item.industryid)} />
                    ) : (
                      <FiEdit onClick={() => handleEdit(item.industryid)} />
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
    </ListWrapper>
    </>
  )
}