import React, { useEffect, useState } from "react";
import Service from "../../../../../Services/Service";
import styled from "styled-components";
import { Row, Col, Card, Stack, Container } from "react-bootstrap";



const RedDiv = styled.div`
  border-radius: 30px;
  background: red;
  color: white;
  height: 30px;
  width: 30px;
  margin-top: 5px,
  margin-bottom: 1px;
  text-align:center;
  padding-top:6px;
  font-size: 8px;
  display:inline-block;
  margin-left:5px;
`;
const WhiteDiv = styled.div`
  border-radius: 50px;
  background: white;
  color: royalblue;
  height: 40px;
  width: 40px;
  margin-top: 10px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:16px;
  border:2px solid royalblue;
  font-weight:bold;
`;

const GreenDiv = styled.div`
  border-radius: 50px;
  background: #00c49f;
  color: white;
  height: 40px;
  width: 40px;
  margin-top: 10px,
  margin-bottom: 10px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:5px;
`;

const AmberDiv = styled.div`
  border-radius: 50px;
  background: #ffbb28;
  color: white;
  height: 40px;
  width: 40px;
  margin-top: 15px,
  margin-bottom: 2px;
  text-align:center;
  padding-top:12px;
  font-size: 10px;
  display:inline-block;
  margin-left:3px;
`;








function GuaranteePipeline() {
  const [region, setRegion] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [industry, setIndustry] = useState([])

  

  useEffect(() => {
    Service.getIndustry()
      .then((res) => {
        setIndustry(res.data.industry.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Service.getProduct()
      .then((res) => {
        setProduct(res.data.product.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    Service.getRegion()
      .then((res) => {
        setRegion(res.data.region.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <React.Fragment>
        <div>
          <p style={{fontWeight:'bold'}}>Scope</p>
          <p>Industries</p>
            <GreenDiv> {industry} </GreenDiv>
            <br/>
          <p>Products</p>
            <GreenDiv>{product}</GreenDiv>
            <br/>
          <p className='py-1 my-1'>Regions</p>
            <GreenDiv>{region}</GreenDiv>
        </div>      
    </React.Fragment>
  );
}

export default GuaranteePipeline;
