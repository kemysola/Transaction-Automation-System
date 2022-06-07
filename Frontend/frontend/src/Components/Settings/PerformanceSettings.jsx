import React, { useRef } from 'react';
import { Container, Form as Fm, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

const ButtonWrapper = styled.button`
  background: green;
  border: 1px solid white;
  padding: 8px 15px;
  margin-top: 3px;
  margin-right: 2px;
  font-size: 11px;
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

export default function PerformanceSettings () {
  const form = useRef();

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();
  
    console.log("User clicked save")
  }

  return (
    <React.Fragment>
      <FormWrapper>
        <Row className="d-flex justify-content-between">
          <Col sm={5} md={5} lg={5} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
            <Row>
              <Form ref={form}>
                <h5>Add Mandates Originated</h5>

                <Fm.Group>
                  <Fm.Label>
                    Mandates Originated
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="mandatesOrg" placeholder="Enter Mandates Originated" validations={[required]} />
                </Fm.Group>
                
                <br />
                
                <div className="d-flex justify-content-end">
                  <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                    Cancel
                  </ButtonWrapper>

                  <ButtonWrapper onClick={save} ref={form}>
                    Save
                  </ButtonWrapper>
                </div>
              </Form>
            </Row>
          </Col>

          <Col sm={5} md={5} lg={5} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }} >
            <Row>
              <Form ref={form}>
                <h5>Add Credit Committee Approval</h5>

                <Fm.Group>
                  <Fm.Label>
                    Credit Committee Approval
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="creditCommApp" placeholder="Enter Credit Committee Approval" validations={[required]} />
                </Fm.Group>

                <br />

                <div className="d-flex justify-content-end">
                  <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                    Cancel
                  </ButtonWrapper>

                  <ButtonWrapper onClick={save} ref={form}>
                    Save
                  </ButtonWrapper>
                </div>
              </Form>
            </Row>
          </Col>
        </Row>

        <Row className="d-flex justify-content-between">
          <Col sm={5} md={5} lg={5} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
            <Row>
              <Form ref={form}>
                <h5>Add Fee Letter</h5>

                <Fm.Group>
                  <Fm.Label>
                    Fee Letter
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="feeLetter" placeholder="Enter Fee Letter" validations={[required]} />
                </Fm.Group>
                
                <br />
                
                <div className="d-flex justify-content-end">
                  <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                    Cancel
                  </ButtonWrapper>

                  <ButtonWrapper onClick={save} ref={form}>
                    Save
                  </ButtonWrapper>
                </div>
              </Form>
            </Row>
          </Col>

          <Col sm={5} md={5} lg={5} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }} >
            <Row>
              <Form ref={form}>
                <h5>Add Financial Close</h5>

                <Fm.Group>
                  <Fm.Label>
                    Financial Close
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="finClose" placeholder="Enter Financial Close" validations={[required]} />
                </Fm.Group>

                <br />

                <div className="d-flex justify-content-end">
                  <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                    Cancel
                  </ButtonWrapper>

                  <ButtonWrapper onClick={save} ref={form}>
                    Save
                  </ButtonWrapper>
                </div>
              </Form>
            </Row>
          </Col>
        </Row>
      </FormWrapper>
    </React.Fragment>
  )
}
