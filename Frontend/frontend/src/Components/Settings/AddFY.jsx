import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

const ButtonWrapper = styled.button`
  background: mediumseagreen;
  border: 1px solid white;
  padding: 4px 8px;
  margin-top: 1px;
  margin-right: 1px;
  font-size: 10px;
  border-radius: 5px;
  color: white;
`;

const FormWrapper = styled.div`
  font-size: 12px;
  padding: 1px;
  // border-radius: 15px;
`;

const TrueWrapper = styled.div`
  color: green
`

const FalseWrapper = styled.div`
  color: red
`

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

export default function FYSettings () {
  const form = useRef();

  const initialFYState = {
    fy: "", 
    startDate: null,
    endDate: null,
    status: "Inactive"
  }

  const [fy, setFY] = useState(initialFYState);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const year = new Date().getFullYear();

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFY({ ...fy, [name]: value})
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 3 seconds set the message value to empty
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();
  
    let data = {
      // store user's input in a variable called data
      fy: fy.fy,
      fy_start_date: fy.startDate,
      fy_end_date: fy.endDate,
      fy_status: fy.status,
    }

    Services.addFY(data)
      .then((res) => {
        setStatus(true)
        setFY(initialFYState)
        setMessage(res.data.message)
      })
      .catch((error) => {
        setStatus(false)
        setMessage("Failed. Please Try Again")
      });
  }

  return (
    <React.Fragment>
      <FormWrapper>
        <Form ref={form}>
          <Row className="d-flex justify-content-between">
            <Col className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
              <p style={{fontSize: "13px"}}><b>Add Financial Year</b></p>
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    FY Name
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input
                    type="text"
                    name="fy"
                    placeholder={`Example: FY${year}`}
                    value={fy.fy}
                    onChange={handleInputChange} 
                    validations={[required]} 
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }}
                  />
                </Fm.Group>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Start Date
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input 
                    type="date" 
                    name="startDate" 
                    value={fy.startDate}
                    max={fy.endDate}
                    onChange={handleInputChange}
                    validations={[required]} 
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }} 
                  />
                </Fm.Group>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    End Date
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input 
                    type="date" 
                    name="endDate" 
                    // placeholder="Enter New Deals Value" 
                    value={fy.endDate}
                    min={fy.startDate}
                    onChange={handleInputChange}
                    validations={[required]} 
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }} 
                  />
                </Fm.Group>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>

              <div className="d-flex justify-content-end">
                {status ? (
                  <TrueWrapper>
                    {message}
                  </TrueWrapper>
                ) : (
                  <FalseWrapper>
                    {message}
                  </FalseWrapper>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </FormWrapper>
    </React.Fragment>
  )
}
