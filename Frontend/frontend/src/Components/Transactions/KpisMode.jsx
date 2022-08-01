import React, { useEffect, useRef, useState } from "react";
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import { FiEdit, FiSave, FiTrash2 } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'

const LabelStyle = styled.label`
border: 1px solid #d9d9d9;
padding: 3px;
background-color: #f2f2f2;
width: 100px;
`

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Kpis = ((props) => {
  // const [data, setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [kpiFactors, setkpiFactors] = useState(null);
  const [kpiYesNo, setkpiYesNo] = useState(null);
  const [kpiConcern, setkpiConcern] = useState(null);
  const [kpiExpected, setkpiExpected] = useState(null);
  const [kpiRespParty, setkpiRespParty] = useState(null);
  const [kpiStatus, setkpiStatus] = useState(null);


  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(props.id, props.transid, kpiFactors, kpiYesNo, kpiConcern, kpiExpected, kpiRespParty, kpiStatus);


    props.editKpis(props.id, props.transid, kpiFactors, kpiYesNo, kpiConcern, kpiExpected, kpiRespParty, kpiStatus);
    setkpiFactors(null);
    setkpiYesNo(null);
    setkpiConcern(null);
    setkpiExpected(null);
    setkpiRespParty(null);
    setkpiStatus(null);
    setEditing(false);
  }

  return (
    <>
    {/* This file is the template for how each NBCFocus should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? 

          // view when updating NBCFocus
          <Fm>
            <div className="form-group">
              <Row className="py-1 d-flex justify-content-space-evenly">
                <Col sm={12}>
                  <Row>
                    <Col className="mt-1 mb-1">
                      {/* <Fm.Label>Original</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.kpiFactors}
                        // value={kpiFactors}
                        onChange={(e) => setkpiFactors(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col className="mt-1 mb-1">
                      {/* <Fm.Label>Concerns</Fm.Label> */}
                      <Fm.Select
                        id={props.id}
                        className="todo-text"
                        type="text"
                        // defaultValue={props.kpiYesNo}
                        value={kpiYesNo}
                        onChange={(e) => setkpiYesNo(e.target.value)}
                        size="sm"
                        style={{fontSize: "12px"}}
                      >
                        <option value=""></option>
                        <option 
                          value={1}
                          selected={props.kpiYesNo === true}
                        >
                          Yes
                        </option>

                        <option 
                          value={0}
                          selected={props.kpiYesNo === false}
                        >
                          No
                        </option>
                      </Fm.Select>
                    </Col>

                    <Col  className="mt-1 mb-1">
                      {/* <Fm.Label>Concerns</Fm.Label> */}
                      <Fm.Select
                        id={props.id}
                        className="todo-text"
                        type="text"
                        // defaultValue={props.kpiConcern}
                        value={kpiConcern}
                        onChange={(e) => setkpiConcern(e.target.value)}
                        size="sm"
                        style={{fontSize: "12px"}}
                      >
                        <option value=""></option>
                        <option 
                          value={"High"}
                          selected={props.kpiConcern === "High"}
                        >
                          High
                        </option>

                        <option 
                          value={"Medium"}
                          selected={props.kpiConcern === "Medium"}
                        >
                          Medium
                        </option>

                        <option 
                          value={"Low"}
                          selected={props.kpiConcern === "Low"}
                        >
                          Low
                        </option>
                      </Fm.Select>
                    </Col>

                    <Col className="mt-1 mb-1">
                      {/* <Fm.Label>Date</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="date"
                        defaultValue={props.kpiExpected ? new Date(props.kpiExpected).toISOString().split("T")[0] : ""}
                        // value={kpiExpected}
                        onChange={(e) => setkpiExpected(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col  className="mt-1 mb-1">
                      {/* <Fm.Label>Original</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.kpiRespParty}
                        // value={kpiRespParty}
                        onChange={(e) => setkpiRespParty(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col  className="mt-1 mb-1">
                      {/* <Fm.Label>Methodology</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.kpiStatus}
                        // value={kpiStatus}
                        onChange={(e) => setkpiStatus(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col style={{marginTop: "5px"}} >
                      <MdOutlineCancel 
                        onClick={() => setEditing(false)}
                        style={{ height: "1rem", width: "1rem", cursor: "pointer"}}
                      />
                      <br />
                    
                      <FiSave 
                        onClick={handleSubmit} 
                        style={{ height: "1rem", width: "1rem", marginTop: "7px", cursor: "pointer"}}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Fm>
          :
          // view when not updating forecast

          <div className="d-flex justify-content-between" >
            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiFactors}
              </label>
            </LabelStyle>           

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiYesNo === true ? "Yes" : "No" }
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiConcern}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiExpected ? new Date(props.kpiExpected).toISOString().split("T")[0] : ""}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiRespParty}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.kpiStatus}
              </label>
            </LabelStyle>

            <FiTrash2 
              style={{ marginTop: "3px", cursor: "pointer"}}
            />
            
            <FiEdit 
              onClick={() => setEditing(true)}
              style={{ marginTop: "3px", cursor: "pointer"}}
            />
          </div>
        }
      </ListGroup.Item>
    </>
  )
})

export default Kpis;