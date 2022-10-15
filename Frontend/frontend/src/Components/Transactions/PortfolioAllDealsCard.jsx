import React,{useEffect, useState, useContext} from 'react';
// import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import Service from "../../Services/Service"
import TitleContext from '../../context/TitleContext';


export default function TransactionCards() {
    // ******************************************  use state hook to store state ****************************************
    const { filteredStore, addFtYear} = useContext(TitleContext)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
     Service.getMyPipelineDeals(filteredStore)
        .then((response) => {
          setData(response.data.deals);
          setLoading(false)
        })
        .catch((e) => {
          console.log(e);
          setLoading(true)
        });
 
  }, [filteredStore]);


  // .................................... Axios Endpoint ..............................
  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  return (
    <React.Fragment>
      <Container>
        <h2 style={{color: "steelblue",fontSize:'15px'}}>Pipeline</h2>
          
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