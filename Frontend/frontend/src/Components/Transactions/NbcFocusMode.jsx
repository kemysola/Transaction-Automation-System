import React, { useEffect, useRef, useState } from "react";
import { Container, Form as Fm, Row, Col, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { FiEdit, FiSave, FiTrash2 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "antd";

const LabelStyle = styled.label`
  border: 1px solid #d9d9d9;
  padding: 3px;
  background-color: #f2f2f2;
  width: 150px;
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const NBCFocus = (props) => {
  // const [data, setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [nbcFocusOriginal, setnbcFocusOriginal] = useState(null);
  const [nbcFocusOriginalYesNo, setnbcFocusOriginalYesNo] = useState(null);
  const [nbcFocusOriginalDate, setnbcFocusOriginalDate] = useState(null);
  const [nbcFocusOriginalMethod, setnbcFocusOriginalMethod] = useState(null);

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

    props.editNBCFocus(
      props.id,
      props.transid,
      nbcFocusOriginal,
      nbcFocusOriginalYesNo,
      nbcFocusOriginalDate,
      nbcFocusOriginalMethod
    );
    setnbcFocusOriginal(null);
    setnbcFocusOriginalYesNo(null);
    setnbcFocusOriginalDate(null);
    setnbcFocusOriginalMethod(null);
    setEditing(false);
  }

  function handleDelete(e) {
    e.preventDefault();

    props.deleteNbcFocus(props.id, props.transid);
  }

  return (
    <>
      {/* This file is the template for how each NBCFocus should look while in view mode and edit mode */}
      <ListGroup.Item>
        {isEditing ? (
          // view when updating NBCFocus
          <Fm>
            <div className="form-group">
              <Row className="py-1">
                <Col sm={12}>
                  <Row>
                    <Col sm={3} className="mt-1 mb-1">
                      {/* <Fm.Label>Original</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.nbcFocusOriginal}
                        // value={nbcFocusOriginal}
                        onChange={(e) => setnbcFocusOriginal(e.target.value)}
                        ref={editFieldRef}
                        size="sm"
                        style={{ fontSize: "12px" }}
                      />
                    </Col>

                    <Col sm={2} className="mt-1 mb-1">
                      {/* <Fm.Label>Concerns</Fm.Label> */}
                      <Fm.Select
                        id={props.id}
                        className="todo-text"
                        type="text"
                        // defaultValue={props.nbcFocusOriginalYesNo}
                        value={nbcFocusOriginalYesNo}
                        onChange={(e) =>
                          setnbcFocusOriginalYesNo(e.target.value)
                        }
                        size="sm"
                        style={{ fontSize: "12px" }}
                      >
                        <option value=""></option>
                        <option
                          value={1}
                          selected={props.nbcFocusOriginalYesNo === true}
                        >
                          Yes
                        </option>

                        <option
                          value={0}
                          selected={props.nbcFocusOriginalYesNo === false}
                        >
                          No
                        </option>
                      </Fm.Select>
                    </Col>

                    <Col sm={3} className="mt-1 mb-1">
                      {/* <Fm.Label>Date</Fm.Label> */}
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="date"
                        defaultValue={
                          props.nbcFocusOriginalDate
                            ? new Date(props.nbcFocusOriginalDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        // value={nbcFocusOriginalDate}
                        onChange={(e) =>
                          setnbcFocusOriginalDate(e.target.value)
                        }
                        ref={editFieldRef}
                        size="sm"
                        style={{ fontSize: "12px" }}
                      />
                    </Col>

                    <Col sm={3} className="mt-1 mb-1">
                      <Fm.Control
                        id={props.id}
                        className="todo-text"
                        type="text"
                        defaultValue={props.nbcFocusOriginalMethod}
                        onChange={(e) =>
                          setnbcFocusOriginalMethod(e.target.value)
                        }
                        ref={editFieldRef}
                        size="sm"
                        style={{ fontSize: "12px" }}
                      />
                    </Col>

                    <Col sm={1} style={{ marginTop: "5px" }}>
                      <MdOutlineCancel
                        onClick={() => setEditing(false)}
                        style={{
                          height: "1rem",
                          width: "1rem",
                          cursor: "pointer",
                        }}
                      />
                      <br />
                      <Tooltip
                        title="Kindly Save using the save Icon to avoid losing data!!!!"
                        open
                        mouseLeaveDelay="0.4"
                      ></Tooltip>

                      <FiSave
                        onClick={handleSubmit}
                        style={{
                          height: "1rem",
                          width: "1rem",
                          marginTop: "7px",
                          cursor: "pointer",
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Fm>
        ) : (
          // view when not updating forecast

          <div className="d-flex justify-content-between">
            <LabelStyle>
              <label
                className="todo-label"
                htmlFor={props.id}
                ref={editButtonRef}
              >
                {props.nbcFocusOriginal}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label
                className="todo-label"
                htmlFor={props.id}
                ref={editButtonRef}
              >
                {props.nbcFocusOriginalYesNo === true ? "Yes" : "No"}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label
                className="todo-label"
                htmlFor={props.id}
                ref={editButtonRef}
              >
                {props.nbcFocusOriginalDate
                  ? new Date(props.nbcFocusOriginalDate)
                      .toISOString()
                      .split("T")[0]
                  : ""}
              </label>
            </LabelStyle>

            <LabelStyle>
              <label
                className="todo-label"
                htmlFor={props.id}
                ref={editButtonRef}
              >
                {props.nbcFocusOriginalMethod}
              </label>
            </LabelStyle>

            <FiTrash2
              onClick={handleDelete}
              style={{ marginTop: "3px", cursor: "pointer" }}
            />

            <FiEdit
              onClick={() => setEditing(true)}
              style={{ marginTop: "3px", cursor: "pointer" }}
            />
          </div>
        )}
      </ListGroup.Item>
    </>
  );
};

export default NBCFocus;
