import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import Service from "../../Services/Service"


export default function TransactionCards() {
    // ******************************************  useState hook to store state data ***************************


  const [data, setData] = useState([]);

    // ******************************************  useEffect hook : componentDidMount  ***********************


  useEffect(() => {
    retrieveDeals();
  }, []);

  // .................................... Axios Endpoint  to get Deals     ..............................
  const retrieveDeals = async() => {
    await Service.getMyPortfolioDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  return (
    <React.Fragment>
      <Container>
        <h2 style={{color: "steelblue",fontSize:'15px'}}>Portfolio</h2>
          
        <Row>
          <Col sm={6} md={6} className='d-md-block'>
            <Card >
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <small>Total Deal Size </small> 
                    <FaCoins /> 
                </Card.Title>

                <Card.Text className='text-info'>
                    <h4>
                      {`₦${(sumTotal)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2
                      })}bn`}
                  </h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <small>Total No of Transactions</small>
                  <FaCoins />
                </Card.Title>

                <Card.Text className='text-info'>
                  <h4>{`${data.length}`}</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </React.Fragment>
)}