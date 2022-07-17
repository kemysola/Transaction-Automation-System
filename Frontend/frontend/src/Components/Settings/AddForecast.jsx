import React, { useRef, useState } from 'react';
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

export default function ForecastSettings () {
  const form = useRef();

  const initialForecastState = {
    projectionyear: "", 
    cumulativegrowth: 0,
    newdeals: 0,
  }

  const [forecast, setForecast] = useState(initialForecastState);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const getYearList = () => {
  	const year = new Date().getFullYear();
    // const year = 2020
    return (
    	Array.from( new Array(20), (v,i) =>
      	<option key={i} value={year+i}>{year+i}</option>
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setForecast({ ...forecast, [name]: value})
  };

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();
  
    let data = {
      // store user's input in a variable called data
      projectionyear: forecast.projectionyear, 
      cumulativegrowth: forecast.cumulativegrowth,
      newdeals: forecast.newdeals,
    }

    Services.addForecast(data)
      .then((res) => {
        setStatus(true)
        setForecast(initialForecastState)
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
              <p style={{fontSize: "13px"}}><b>New Guarantee Forecast</b></p>
                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Year
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Select 
                    name="projectionyear" 
                    value={forecast.projectionyear}
                    onChange={handleInputChange} 
                    validations={[required]} 
                    style={{ 
                      width: "100%", 
                      padding: "4px 2px", 
                      focus: "none"
                    }}
                  >
                    <option value=""></option>
                    {getYearList()}
                  </Select>
                </Fm.Group>

                <Fm.Group style={{ marginBottom: "5px"}}>
                  <Fm.Label>
                    Cumulative Growth (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input 
                    type="number" 
                    name="cumulativegrowth" 
                    // placeholder="Enter Cumulative Growth Value" 
                    value={forecast.cumulativegrowth}
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
                    New Deals (₦'BN)
                    <span style={{ color: "red" }}>*</span>
                  </Fm.Label>
                  <Input 
                    type="number" 
                    name="newdeals" 
                    // placeholder="Enter New Deals Value" 
                    value={forecast.newdeals}
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
