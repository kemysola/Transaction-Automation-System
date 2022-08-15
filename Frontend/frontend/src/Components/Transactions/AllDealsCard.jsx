import React,{useEffect, useState} from 'react';
// import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import Service from "../../Services/Service"


export default function TransactionCards({ props, closedStatus, staffFilter }) {
    // ******************************************  use state hook to store state ****************************************

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
     retrieveDeals();
 
  }, []);

  useEffect(() => {
    if (closedStatus === "" && staffFilter === "All") {
      retrieveDeals();
    }
    if (closedStatus && staffFilter === "All") {
      retrieveDeals();
      filterData(closedStatus)
    }
    if (closedStatus === "" && staffFilter !== "All") {
      retrieveStaffDeals();
      // setLoading(true);
      // specificDeals();
    }
    if (closedStatus && staffFilter !== "All") {
      retrieveStaffDeals();
      setLoading(true);
      filterStaffData(closedStatus);
    }
  }, [closedStatus, staffFilter]); 

  const retrieveDeals = () => {
    Service.getPortfolioAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  }

   // Get deals by staff email
   const retrieveStaffDeals = () => {
    setLoading(true);
    Service.getMyDealsByEmail(staffFilter)
      .then((res) => {
        setData(res.data.deals);
        setStaffData(res.data.deals);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Filter Data by Closed Status either True or False
  let filterTimeout;
  const filterData = (closedStatus) => {
    clearTimeout(filterTimeout);
    setLoading(true);

    filterTimeout = setTimeout(() => {
      if (closedStatus === "true") {
        setData(
          rawData.filter((item) => {
            return item.closed === true;
          })
        );
      } else if (closedStatus === "false") {
        setData(
          rawData.filter((item) => {
            return item.closed === false;
          })
        );
      }

    setLoading(false);
    return
    }, 500);
  };

  // Filter Individual Staff Data by Closed Status
  const filterStaffData = (closedStatus) => {
    clearTimeout(filterTimeout);
    setLoading(true);

    filterTimeout = setTimeout(() => {
      if (closedStatus === "true") {
        setData(
          staffData.filter((item) => {
            return item.closed === true;
          })
        );
      } else if (closedStatus === "false") {
        setData(
          staffData.filter((item) => {
            return item.closed === false;
          })
        );
      }

      setLoading(false);
      return 
    }, 500);
  };


  // .................................... Axios Endpoint ..............................
 

  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  return (
    <React.Fragment>
      <Container>
        <h2 style={{color: "steelblue",fontSize:'15px'}}>Global Deals</h2>
          
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