import React, { useEffect, useRef, useState } from "react";
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import { FiEdit, FiSave, FiTrash2 } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'

const LabelStyle = styled.label`
border: 1px solid #d9d9d9;
padding: 3px;
background-color: #f2f2f2;
width: 150px;
`

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Parties = ((props) => {
  // const [data, setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [partiesRole, setpartiesRole] = useState(null);
  const [partiesParty, setpartiesParty] = useState(null);
  const [partiesAppointed, setpartiesAppointed] = useState(null);
  const [partiesStatus, setpartiesStatus] = useState(null);

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

    console.log(props.id, props.transid, partiesRole, partiesParty, partiesAppointed, partiesStatus);


    props.editParties(props.id, props.transid, partiesRole, partiesParty, partiesAppointed, partiesStatus);
    setpartiesRole(null);
    setpartiesParty(null);
    setpartiesAppointed(null);
    setpartiesStatus(null);
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
              <Row className="py-1">
                <Col sm={12}>
                  <Row>
                    <Col sm={3} className="mt-1 mb-1">
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.partiesRole}
                        // value={partiesRole}
                        onChange={(e) => setpartiesRole(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col sm={2} className="mt-1 mb-1">
                      <Fm.Select
                        id={props.id}
                        className="todo-text"
                        type="text"
                        // defaultValue={props.partiesAppointed}
                        value={partiesAppointed}
                        onChange={(e) => setpartiesAppointed(e.target.value)}
                        size="sm"
                        style={{fontSize: "12px"}}
                      >
                        <option value={null}></option>
                        <option 
                          value={1}
                          selected={props.partiesAppointed === true}
                        >
                          Yes
                        </option>

                        <option 
                          value={0}
                          selected={props.partiesAppointed === false}
                        >
                          No
                        </option>
                      </Fm.Select>
                    </Col>

                    <Col sm={3} className="mt-1 mb-1">
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.partiesParty}
                        // value={partiesParty}
                        onChange={(e) => setpartiesParty(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col sm={3} className="mt-1 mb-1">
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.partiesStatus}
                        // value={partiesStatus}
                        onChange={(e) => setpartiesStatus(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{fontSize: "12px"}}
                      />
                    </Col>

                    <Col sm={1} style={{marginTop: "5px"}} >
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
                {props.partiesRole}
              </label>
            </LabelStyle>           

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.partiesAppointed === true ? "Yes" : "No" }
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.partiesParty}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
                {props.partiesStatus}
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

export default Parties;
;