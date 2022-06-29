import React, { useRef } from 'react';
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

  const getYearList = () => {
  	const year = new Date().getFullYear();
    return (
    	Array.from( new Array(30), (v,i) =>
      	<option key={i} value={year+i}>{year+i}</option>
      )
    );
  };

  const onChange = e => {
  	console.log("selected value:", e.target.value);
  };

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
            <Row className="d-flex justify-content-between">
              <p style={{fontSize: "13px"}}><b>New Guarantee Forecast</b></p>
              <Col sm={10} md={10} lg={10} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
                {/* <Col sm={4} md={4} lg={4} > */}
                  <Fm.Group style={{ marginBottom: "5px"}}>
                    <Fm.Label>
                      Year
                      <span style={{ color: "red" }}>*</span>
                    </Fm.Label>
                    <Select name="year" placeholder="Enter Year" onChange={onChange} validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}}>
                      {getYearList()}
                    </Select>
                    {/* <Input type="text" name="year" placeholder="Enter Year" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} /> */}
                  </Fm.Group>
                {/* </Col> */}

                {/* <Col sm={4} md={4} lg={4} > */}
                  <Fm.Group style={{ marginBottom: "5px"}}>
                    <Fm.Label>
                      Cumulative Growth (₦'BN)
                      <span style={{ color: "red" }}>*</span>
                    </Fm.Label>
                    <Input type="number" name="cumuGrowth" placeholder="Enter Cumulative Growth Value" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} />
                  </Fm.Group>
                {/* </Col> */}

                {/* <Col sm={4} md={4} lg={4}> */}
                  <Fm.Group style={{ marginBottom: "5px"}}>
                    <Fm.Label>
                      New Deals (₦'BN)
                      <span style={{ color: "red" }}>*</span>
                    </Fm.Label>
                    <Input type="number" name="newDeals" placeholder="Enter New Deals Value" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} />
                  </Fm.Group>
                {/* </Col> */}

                <div className="d-flex justify-content-end">
                  <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                    Cancel
                  </ButtonWrapper>

                  <ButtonWrapper onClick={save} ref={form}>
                    Save
                  </ButtonWrapper>
                </div>
              </Col>
            </Row>
          </Form>

          <Form ref={form}>
            <Row style={{ borderRadius: 10 + 'px' }}>
              <p style={{fontSize: "13px"}}><b>Guarantee Pipeline Forecast</b></p>
              <Col sm={10} md={10} lg={10} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Select name="year" placeholder="Enter Year" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}}>
                    {getYearList()}
                  </Select>
                </Fm.Group>
              {/* </Col>

              <Col sm={4} md={4} lg={4} > */}
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Pipeline (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="pipeline" placeholder="Enter Pipeline Value" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} />
                </Fm.Group>
              

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>
              </Col>
            </Row>
          </Form>

          <Form ref={form}>
            <Row style={{ borderRadius: 10 + 'px' }}>
              <p style={{fontSize: "13px"}}><b>Deal Category Forecast</b></p>
              <Col sm={10} md={10} lg={10} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }}>
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Select name="year" placeholder="Enter Year" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}}>
                    {getYearList()}
                  </Select>
                </Fm.Group>
              {/* </Col>

              <Col sm={4} md={4} lg={4} > */}
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Green Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="greenDeals" placeholder="Enter Green Deals Value" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} />
                </Fm.Group>
              {/* </Col>

              <Col sm={4} md={4} lg={4}> */}
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Green and Amber Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input type="number" name="greenAmberDeals" placeholder="Enter Green and Amber Deals Value" validations={[required]} style={{ width: "100%", padding: "4px 2px", focus: "none"}} />
                </Fm.Group>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
                  Cancel
                </ButtonWrapper>

                <ButtonWrapper onClick={save} ref={form}>
                  Save
                </ButtonWrapper>
              </div>
              </Col>
            </Row>
          </Form>
        {/* </Container> */}
      </FormWrapper>
    </React.Fragment>
  )
}
