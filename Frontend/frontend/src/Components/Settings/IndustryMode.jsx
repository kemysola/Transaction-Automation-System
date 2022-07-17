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

const Industry = ((props) => {
  const [isEditing, setEditing] = useState(false);
  const [newIndustryName, setNewIndustryName] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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

  function handleChange(e) {
    setNewIndustryName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newIndustryName.trim()) {
      return;
    }
    props.editIndustry(props.id, newIndustryName);
    setNewIndustryName("");
    setEditing(false);
  }

  return (
    <>
    {/* This file is the template for how each industry should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? 

          // view when updating industry
          <Fm>
            <div className="form-group">
              <label htmlFor={props.id}>
                Update {props.industry}
              </label>

              <Row>
                <Col sm={10} md={10} lg={10}>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newIndustryName}
                    onChange={handleChange}
                    ref={editFieldRef}
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
                    onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
                  /> 
                  {/* {isHovering && <span>Save</span>} */}
                </Col>
              </Row>
            </div>
          </Fm>
          :
          // view when not updating industry
          <div className="d-flex justify-content-between" style={{ cursor: "pointer"}}>
            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.industry}
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

export default Industry;