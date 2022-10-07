import React, { useRef, useState, useEffect } from 'react';
import { Container, Form as Fm, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import { useForm } from "react-hook-form";

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

export default function FYSettings () {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onBlur"
  });
  const handleError = (errors) => {};

  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const registerOptions = {
    fy: { required: "Name is required" },
    fy_start_date: { required: "Start Date is required" },
    fy_end_date: { required: "End Date is required" }
  };

  const year = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      // After 3 seconds set the message value to empty
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const save = (reqdata, e) => {
    e.preventDefault();
  
    let data = {
      // store user's input in a variable called data
      fy: reqdata.fy,
      fy_start_date: reqdata.fy_start_date,
      fy_end_date: reqdata.fy_end_date,
      fy_status: "Inactive",
    }

    Services.addFY(data)
      .then((res) => {
        setStatus(true)
        setMessage(res.data.message)
        reset();
      })
      .catch((error) => {
        setStatus(false)
        setMessage("Failed. Please Try Again")
      });    
  }

  return (
    <React.Fragment>
      <FormWrapper>
        <form onSubmit={handleSubmit(save, handleError)}>
          <Row className="d-flex justify-content-between">
            <Col className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
              <p style={{fontSize: "13px"}}><b>Add Financial Year</b></p>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    FY Name
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Fm.Control
                    type="text"
                    name="fy"
                    size='sm'
                    placeholder={`Example: FY${year}`}
                    pattern="[FY]{2}\d{4}"
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }}
                    {...register('fy', registerOptions.fy )}
                  />
                    <small className="text-danger">
                      {errors?.fy && errors.fy.message}
                    </small>
                </Fm.Group>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Start Date
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Fm.Control 
                    type="date" 
                    name="fy_start_date" 
                    size='sm'
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }} 
                    {...register('fy_start_date', registerOptions.fy_start_date)}
                  />
                  <small className="text-danger">
                    {errors?.fy_start_date && errors.fy_start_date.message}
                  </small>
                </Fm.Group>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    End Date
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Fm.Control 
                    type="date" 
                    name="fy_end_date" 
                    size='sm'
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }} 
                    {...register('fy_end_date', registerOptions.fy_end_date)}
                  />
                  <small className="text-danger">
                    {errors?.fy_end_date && errors.fy_end_date.message}
                  </small>
                </Fm.Group>

              <div className="d-flex justify-content-end">
                <ButtonWrapper type='reset' style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper>
                  Save
                </ButtonWrapper>
              </div>

              <div className="d-flex justify-content-end" style={{fontSize: '13px'}}>
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
          
        </form>

      </FormWrapper>
    </React.Fragment>
  )
}
