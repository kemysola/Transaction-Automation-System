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

const Level = ((props) => {
  const [isEditing, setEditing] = useState(false);
  const [newLevel, setNewLevel] = useState('');

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
    setNewLevel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newLevel.trim()) {
      return;
    }
    props.editLevel(props.id, newLevel);
    setNewLevel("");
    setEditing(false);
  }

  return (
    <>
    {/* This file is the template for how each level should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? 

          // view when updating level
          <Fm>
            <div className="form-group">
              <label htmlFor={props.id}>
                Update {props.level}
              </label>

              <Row>
                <Col sm={10} md={10} lg={10}>
                  <Fm.Control
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newLevel}
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
                  />
                </Col>
              </Row>
            </div>
          </Fm>
          :
          // view when not updating level
          <div className="d-flex justify-content-between" style={{ cursor: "pointer"}}>
            <label className="todo-label" htmlFor={props.id} ref={editButtonRef}>
              {props.level}
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

export default Level;