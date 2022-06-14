import React, { useRef, useState } from 'react';
import { Container, Form as Fm, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Services from "../../Services/Service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

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

  const [product, setProduct] = useState("");
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");

  const save = (e) => {
    e.preventDefault();
    form.current.validateAll();
  
    let data = {
        // store user's input in a variable called data
        "product": product
      }
  
      Services.addProduct(data)
        .then((res) => {
          setStatus(true)
          setMessage(res.data.message)
          setProduct("")
        })
        .catch((error) => {
          setStatus(false)
          setMessage("Failed. Please Try Again")
        });
  }

  return (
    <React.Fragment>
      <FormWrapper>        
        <Row>
          <Col sm={5} md={5} lg={5} className="bg-light py-1 my-2" style={{ borderRadius: 10 + 'px' }} >
            <Form ref={form}>
              <p style={{fontSize: "13px"}}><b>Add Product</b></p>

              <Fm.Group style={{ marginBottom: "5px"}}>
                <Fm.Label>
                  Product
                  <span style={{ color: "red" }}>*</span>
                </Fm.Label>
                <Input 
                  type="text" 
                  name="product" 
                  placeholder="Enter Product" 
                  validations={[required]} 
                  style={{ width: "100%", padding: "4px 2px", focus: "none"}} 
                  onChange={e => setProduct(e.target.value)}
                />
              </Fm.Group>

              <div className="d-flex justify-content-end">
                <ButtonWrapper style={{ backgroundColor: "grey", color: "white" }}>
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
        </Row>
      </FormWrapper>
    </React.Fragment>
  )
}
