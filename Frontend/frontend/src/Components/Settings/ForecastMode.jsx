import React, { useEffect, useRef, useState } from "react";
import { Container, Form as Fm, Row, Col, ListGroup} from "react-bootstrap";
import { FiEdit, FiSave } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Forecast = ((props) => {
  const initialForecastState = {
    projectionyear: "", 
    cumulativegrowth: 0,
    newdeals: 0,
  }

  const [isEditing, setEditing] = useState(false);
  const [newForecastValues, setNewForecastValues] = useState(initialForecastState);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  
  const wasEditing = usePrevious(isEditing);

  // console.log("forecast values here", newForecastValues)

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const getYearList = () => {
    const year = new Date().getFullYear();
    // const year = 2020
    return (
      Array.from( new Array(20), (v,i) =>
        <option key={i} value={year+i}>{year+i}</option>
      )
    );
  };

  function handleChange(e) {
    const { name, value} = e.target;
    setNewForecastValues({ ...newForecastValues, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newForecastValues.trim()) {
      return;
    }
    props.editForecast(props.id, newForecastValues);
    setNewForecastValues(initialForecastState);
    setEditing(false);
  }

  return (
    <>
    {/* This file is the template for how each forecast should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? 

          // view when updating forecast
          <Fm>
            <div className="form-group">
              <label htmlFor={props.id}>
                Update {props.projectionyear} Values
              </label>

              <Row>
                <Col sm={4} md={4} lg={4}>
                  <Fm.Label>Year</Fm.Label>
                  <Fm.Select
                    id={props.id}
                    className="todo-text"
                    value={newForecastValues.projectionyear}
                    onChange={handleChange}
                    ref={editFieldRef}
                    size="sm"
                    style={{fontSize: "12px", width: "60%"}}
                  >
                    {/* <option>Select</option> */}
                    {getYearList()}
                  </Fm.Select>
                </Col>

                <Col sm={3} md={3} lg={3}>
                  <Fm.Label>Cu. Growth</Fm.Label>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newForecastValues.cumulativegrowth}
                    onChange={handleChange}
                    size="sm"
                    style={{fontSize: "12px", width: "60%"}}
                  />
                </Col>

                <Col sm={3} md={3} lg={3}>
                  <Fm.Label>New Deals</Fm.Label>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newForecastValues.newdeals}
                    onChange={handleChange}
                    size="sm"
                    style={{fontSize: "12px", width: "60%"}}
                  />
                </Col>

                <Col sm={1} md={1} lg={1}>
                  <MdOutlineCancel 
                    onClick={() => setEditing(false)}
                    style={{ height: "1rem", width: "1rem", marginTop: "3px", cursor: "pointer"}}
                  />
                </Col>

                <Col sm={1} md={1} lg={1}>
                  <FiSave 
                    onClick={handleSubmit} 
                    style={{ height: "1rem", width: "1rem", marginTop: "3px", cursor: "pointer"}}
                  />
                </Col>
              </Row>
            </div>
          </Fm>
          :
          // view when not updating forecast
          <div className="d-flex justify-content-between" style={{ cursor: "pointer"}}>
            
            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.projectionyear}
            </label>

            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.cumulativegrowth}
            </label>

            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.newdeals}
            </label>
            
            <FiEdit 
              onClick={() => setEditing(true)}
            />
          </div>
        }
      </ListGroup.Item>
    </>
  )
})

export default Forecast;