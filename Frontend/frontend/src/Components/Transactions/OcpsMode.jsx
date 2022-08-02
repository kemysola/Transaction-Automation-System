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

const Ocps = ((props) => {
  // const [data, setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [ocpsFactors, setocpsFactors] = useState(null);
  const [ocpsYesNo, setocpsYesNo] = useState(null);
  const [ocpsConcern, setocpsConcern] = useState(null);
  const [ocpsExpected, setocpsExpected] = useState(null);
  const [ocpsRespParty, setocpsRespParty] = useState(null);
  const [ocpsStatus, setocpsStatus] = useState(null);


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

    console.log(props.id, props.transid, ocpsFactors, ocpsYesNo, ocpsConcern, ocpsExpected, ocpsRespParty, ocpsStatus);


    props.editOcps(props.id, props.transid, ocpsFactors, ocpsYesNo, ocpsConcern, ocpsExpected, ocpsRespParty, ocpsStatus);
    setocpsFactors(null);
    setocpsYesNo(null);
    setocpsConcern(null);
    setocpsExpected(null);
    setocpsRespParty(null);
    setocpsStatus(null);
    setEditing(false);
  }

  function handleDelete(e){
    e.preventDefault();

    props.deleteOcps(props.id, props.transid)
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
                        defaultValue={props.ocpsFactors}
                        // value={ocpsFactors}
                        onChange={(e) => setocpsFactors(e.target.value)}
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
                        // defaultValue={props.ocpsYesNo}
                        value={ocpsYesNo}
                        onChange={(e) => setocpsYesNo(e.target.value)}
                        size="sm"
                        style={{fontSize: "12px"}}
                      >
                        <option value=""></option>
                        <option 
                          value={1}
                          selected={props.ocpsYesNo === true}
                        >
                          Yes
                        </option>

                        <option 
                          value={0}
                          selected={props.ocpsYesNo === false}
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
                        // defaultValue={props.ocpsConcern}
                        value={ocpsConcern}
                        onChange={(e) => setocpsConcern(e.target.value)}
                        size="sm"
                        style={{fontSize: "12px"}}
                      >
                        <option value=""></option>
                        <option 
                          value={"High"}
                          selected={props.ocpsConcern === "High"}
                        >
                          High
                        </option>

                        <option 
                          value={"Medium"}
                          selected={props.ocpsConcern === "Medium"}
                        >
                          Medium
                        </option>

                        <option 
                          value={"Low"}
                          selected={props.ocpsConcern === "Low"}
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
                        defaultValue={props.ocpsExpected ? new Date(props.ocpsExpected).toISOString().split("T")[0] : ""}
                        // value={ocpsExpected}
                        onChange={(e) => setocpsExpected(e.target.value)}
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
                        defaultValue={props.ocpsRespParty}
                        // value={ocpsRespParty}
                        onChange={(e) => setocpsRespParty(e.target.value)}
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
                        defaultValue={props.ocpsStatus}
                        // value={ocpsStatus}
                        onChange={(e) => setocpsStatus(e.target.value)}
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
                {props.ocpsFactors}
              </label>
            </LabelStyle>           

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.ocpsYesNo === true ? "Yes" : "No" }
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.ocpsConcern}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.ocpsExpected ? new Date(props.ocpsExpected).toISOString().split("T")[0] : ""}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.ocpsRespParty}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.ocpsStatus}
              </label>
            </LabelStyle>

            <FiTrash2 
              onClick={handleDelete}
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

export default Ocps;