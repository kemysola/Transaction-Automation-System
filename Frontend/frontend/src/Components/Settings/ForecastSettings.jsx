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

export default function ForecastSettings () {
  const form = useRef();

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();
  
    console.log("User clicked save")
  }

  return (
    <React.Fragment>
      <FormWrapper>
        {/* <Container fluid > */}
          <Form ref={form}>
            <Row className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
              <h5>New Guarantee Forecast</h5>
              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="year" placeholder="Enter Year" validations={[required]} />
                </Fm.Group>
              </Col>

              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Cumulative Growth (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="cumuGrowth" placeholder="Enter Cumulative Growth Value" validations={[required]} />
                </Fm.Group>
              </Col>

              <Col sm={4} md={4} lg={4}>
                <Fm.Group>
                  <Fm.Label>
                    New Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="newDeals" placeholder="Enter New Deals Value" validations={[required]} />
                </Fm.Group>
              </Col>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>
            </Row>
          </Form>

          <Form ref={form}>
            <Row className="bg-light py-1 my-2"  style={{ borderRadius: 10 + 'px' }}>
              <h5>Guarantee Pipeline Forecast</h5>
              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="year" placeholder="Enter Year" validations={[required]} />
                </Fm.Group>
              </Col>

              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Pipeline (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="pipeline" placeholder="Enter Pipeline Value" validations={[required]} />
                </Fm.Group>
              </Col>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>
            </Row>
          </Form>

          <Form ref={form}>
            <Row className="bg-light py-1 my-2"  style={{ borderRadius: 10 + 'px' }}>
              <h5>Deal Category Forecast</h5>
              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="text" name="year" placeholder="Enter Year" validations={[required]} />
                </Fm.Group>
              </Col>

              <Col sm={4} md={4} lg={4} >
                <Fm.Group>
                  <Fm.Label>
                    Green Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="greenDeals" placeholder="Enter Green Deals Value" validations={[required]} />
                </Fm.Group>
              </Col>

              <Col sm={4} md={4} lg={4}>
                <Fm.Group>
                  <Fm.Label>
                    Green and Amber Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="greenAmberDeals" placeholder="Enter Green and Amber Deals Value" validations={[required]} />
                </Fm.Group>
              </Col>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>
            </Row>
          </Form>
        {/* </Container> */}
      </FormWrapper>
    </React.Fragment>
  )
}
