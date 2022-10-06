import React, { useEffect, useRef, useState } from "react";
import { Container, Form as Fm, Row, Col, ListGroup, FormCheck} from "react-bootstrap";
import { FiEdit, FiSave } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'
// import Services from "../../Services/Service";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FY = ((props) => {
  // const [data, setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [swt2, setSwt2] = useState(props.status);
  const [isChecked, setIsChecked] = useState(true)
  const start = new Date(props.fy_start_date)
  const end = new Date(props.fy_end_date)
  const fyStatus = props.status
  // console.log("start:", start, "end:", end)

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    // retrieveFY()
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // useEffect(() => {
  //   // retrieveFY()
  // }, [swt2])

  // const retrieveFY = () => {
  //   Services.getFY("''")
  //   .then((response) => {
  //       setFY(response.data.financial_years);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  function handleSubmit(e) {
    e.preventDefault();

    props.editFY(props.id, props.fy, startDate, endDate, swt2);
    setStartDate();
    setEndDate();
    // setSwt2();
    setEditing(false);
  }

  const onChangeSwt = () => {
    if (swt2 == 'Active'){
      setSwt2('Inactive')
    }else{
      setSwt2('Active')
    }
  };

  console.log("I am from FYMode", swt2)


  return (
    <>
    {/* This file is the template for how each FY should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? 

          // view when updating FY
          <Fm>
            <div className="form-group">
              <label htmlFor={props.id}>
                Update <strong> {props.fy} </strong> Values
              </label>

              <Row>
                <Col lg={4}>
                  <Fm.Label>Start Date</Fm.Label>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="date"
                    value={startDate}
                    max={endDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    ref={editFieldRef}
                    size="sm"
                    style={{fontSize: "12px", width: "60%"}}
                  />
                </Col>

                <Col lg={4}>
                  <Fm.Label>End Date</Fm.Label>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    size="sm"
                    style={{fontSize: "12px", width: "60%"}}
                  />
                </Col>

                <Col lg={2}>
                {/* <Fm.Label>Activate</Fm.Label> */}
                <Fm.Label>Status</Fm.Label>
                  <Fm.Check 
                    type="switch"
                    id={props.id}
                    checked={swt2 == 'Active' ? true : false}
                    onChange={onChangeSwt}
                    label={swt2}
                  />
                  {/* <Fm.Check custom type="switch" id="switchEnabled">
                    <Fm.Check.Input isInvalid checked={swt2} />
                    <Fm.Check.Label onClick={() => setSwt2(!swt2)}>
                      {`Value is ${swt2}`}
                    </Fm.Check.Label>
                  </Fm.Check> */}
                      {/* <FormCheck custom type="switch">
        <FormCheck.Input isInvalid checked={swt2} />
        <FormCheck.Label onClick={() => setSwt2(!swt2)}>
          {`Value is ${swt2}`}
        </FormCheck.Label>
      </FormCheck> */}
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
          // view when not updating FY
          <div className="d-flex justify-content-between" style={{ cursor: "pointer"}}>
            
            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.fy}
            </label>

            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {`${start.toISOString().slice(0, 10)}`}
            </label>

            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {`${end.toISOString().slice(0, 10)}`}
            </label>

            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {swt2}
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

export default FY;