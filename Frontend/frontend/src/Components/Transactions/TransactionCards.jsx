import React,{useEffect, useState} from 'react';
// import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import TableView from './TransactionTable';
import styles from './Transactions.css';
import Service from "../../Services/Service"


export default function TransactionCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveDeals();
  }, []);

  // .................................... Axios Endpoint ..............................
  const retrieveDeals = () => {
    Service.getAllDeals()
      .then((response) => {
        console.log(response.data.deals)
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var red = data.reduce(function (filtered, arr) {
      var someNewValue = arr.dealsize;
      filtered.push(someNewValue);
      console.log(filtered)
    return filtered;
  }, []);

  var redTotal = red.reduce(function (tot, arr) {
    return tot + parseFloat(arr);
  }, 0);

  return (
    <React.Fragment>
      <Container>
        <h3 style={{color: "steelblue"}}>All Transactions</h3>
          
        <Row>
          <Col sm={6}>
            <Card className={styles.roundedCorners}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <small>Total Transaction </small> 
                    <FaCoins /> 
                </Card.Title>

                <Card.Text className='text-info'>
                    <h4>{redTotal}</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <small>Lorem, ipsum dolor </small>
                  <FaCoins />
                </Card.Title>

                <Card.Text className='text-info'>
                  <h4>123,000,000,000</h4>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Container>
            <TableView />
          </Container>
        </Row>

      </Container>
    </React.Fragment>
)}