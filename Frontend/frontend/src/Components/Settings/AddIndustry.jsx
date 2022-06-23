import React, { useRef, useState } from 'react';
import { Container, Form as Fm, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { GrCheckmark } from "react-icons/gr";
import { GrClose } from "react-icons/gr";

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


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block text-danger">
        This field is required!
      </div>
    );
  }
};

export default function IndustrySettings () {
  const form = useRef();

  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const handleCancel = () => {
    // e.preventDefault();
    // e.target.reset();
    setIndustry("")
  }

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();

    let data = {
      // store user's input in a variable called data
      "industry": industry
    }

    Services.addIndustry(data)
      .then((res) => {
        setStatus(true)
        setMessage(res.data.message)
        setIndustry("")
      })
      .catch((error) => {
        setStatus(false)
        setMessage("Failed. Please Try Again")
      });
  }

  return (
    <React.Fragment>
      <FormWrapper>
        <Row className="d-flex justify-content-between">
          <Col sm={10} md={10} lg={10} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
            <Form ref={form}>
              <p style={{fontSize: "13px"}}><b>Add New Industry</b></p>

              <Fm.Group style={{ marginBottom: "5px"}}>
                <Fm.Label>
                  Industry
                  <span style={{ color: "red" }}>*</span>
                </Fm.Label>
                <Input 
                  type="text" 
                  name="industry" 
                  placeholder="Enter Industry" 
                  validations={[required]} 
                  style={{ width: "100%", padding: "4px 2px", focus: "none"}} 
                  onChange={e => setIndustry(e.target.value)}
                />
              </Fm.Group>
              
              {/* <br /> */}
              
              <div className="d-flex justify-content-end">
                <ButtonWrapper onClick={handleCancel} style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
                <br />
                {message}
              </div>
            </Form>
          </Col>

          <Col sm={2} md={2} lg={2} >
            {status ? (
              <div class='animate__animated animate__pulse py-1'>
                <GrCheckmark />
                {message}
              </div>
            ) : (
              <div class='animate__animated animate__pulse py-1'>
                <GrClose />
                {message}
              </div>
            )}
          </Col> 
        </Row>
      </FormWrapper>
    </React.Fragment>
  )
}
