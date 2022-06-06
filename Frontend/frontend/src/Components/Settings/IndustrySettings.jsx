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

export default function IndustrySettings () {
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
          <Col sm={3} md={3} lg={3} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px'}}>
            <Form ref={form}>
              <h5>Add Industry</h5>

              <Fm.Group>
                <Fm.Label>
                  Industry
                  <span style={{ color: "red" }}>*</span>
                </Fm.Label>
                <Input type="text" name="industry" placeholder="Enter Industry" validations={[required]} />
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
          </Col>

          <Col sm={3} md={3} lg={3} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }} >
            <Form ref={form}>
              <h5>Add Product</h5>

              <Fm.Group>
                <Fm.Label>
                  Product
                  <span style={{ color: "red" }}>*</span>
                </Fm.Label>
                <Input type="text" name="product" placeholder="Enter Product" validations={[required]} />
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
          </Col>

          <Col sm={3} md={3} lg={3} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
            <Form ref={form}>
              <h5>Add Level</h5>

              <Fm.Group>
                <Fm.Label>
                  Level
                  <span style={{ color: "red" }}>*</span>
                </Fm.Label>
                <Input type="text" name="level" placeholder="Enter Level" validations={[required]} />
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
          </Col>
        </Row>
      </FormWrapper>
    </React.Fragment>
  )
}