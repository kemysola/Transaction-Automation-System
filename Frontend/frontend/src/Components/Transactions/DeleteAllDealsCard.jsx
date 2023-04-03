import React,{useEffect, useState, useContext} from 'react';
// import styled from 'styled-components';
import { Container, Row, Col, Card ,Spinner} from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import Service from "../../Services/Service"
import TitleContext from '../../context/TitleContext';

export default function TransactionCards({ props, closedStatus, staffFilter, status, reload }) {
    // ******************************************  use state hook to store state ****************************************
    const { filteredStore, addFtYear} = useContext(TitleContext)
    const [filtValue, setFiltValue] = useState('FY2020')
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
     retrieveDeals();
  }, [filteredStore]);

  useEffect(() => {
    retrieveDeals();
   
  }, [reload]) 

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
    }
    if ((closedStatus === "true" || closedStatus === "false") && staffFilter !== "All") {
      retrieveStaffDeals();
      filterStaffData(closedStatus);
    }
  }, [closedStatus, staffFilter, filteredStore]); 
  const retrieveDeals =async () => {
    const year = filteredStore
    await Service.getPortfolioAllDeals(year)
      .then((response) => {
        setData(response.data.deals);
        setRawData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  }

   // Get deals by staff email
   const retrieveStaffDeals = () => {
    setLoading(true);
    const year = filteredStore

    Service.getMyDealsByEmail(staffFilter, year)
      .then((res) => {
        setData(res.data.deals);
        setStaffData(res.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
      setLoading(false);

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

    if (status === "changed") {
      // setClosedStatus("")
      retrieveStaffDeals()
    } 

    else if (closedStatus === "true" || closedStatus === "false") {
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
  }};

  var sum = data.length;

  // .................................... Axios Endpoint ..............................
 

  var sumTotal = data.reduce(function (tot, arr) {
    return tot + parseFloat(arr.dealsize);
  }, 0);

  return (
    <React.Fragment>
        <h2 style={{color: "steelblue",fontSize:'15px'}}>Delete Deals</h2>
          
        <Row>
          <Col sm={6} md={6} className='d-md-block'>

            <Card >
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <small>Total Deal Size </small> 
                    <FaCoins /> 
                </Card.Title>

                <Card.Text className='text-info'>
                  {loading === true ? (
                    <Spinner animation="border" variant="primary" />
                    ) : (
                      <h4>
                        {`₦${(sumTotal)
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 2
                          })}bn`}
                      </h4>
                    )}
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
                  {loading === true ?  (<Spinner animation="border" variant="primary" />):<h4>{sum}</h4>}
                
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>

    </React.Fragment>
)}