import React,{useEffect, useState} from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { BiReceipt } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { FaRegHandshake } from 'react-icons/fa';
import { CgCalculator } from 'react-icons/cg'
import {GrMoney} from 'react-icons/gr';
import {GiMoneyStack} from 'react-icons/gi'
import Service from '../../Services/Service';
import Stats from '../Dashboard/Management/Cards/Stats';
import { fontFamily } from '@mui/system';



export default function SubCards() {
    const [totalTransaction, setTotalTransaction] = useState([]);
    const [data, setData] = useState([])
    const [length, setLength] = useState([])
    const [staff, setStaff] = useState([])

    useEffect(() => {
        retrieveDeals()
        

    },[])

    useEffect(() => {
      retrieveStaff()
      

  },[])

    const retrieveDeals = () => {
        Service.getAllDeals()
          .then((response) => {
            setData(response.data.deals);
            
            
          })
          .catch((e) => {
            console.log(e);
          });
      };

      const retrieveStaff = () => {
        Service.getAllStaff()
          .then((response) => {
            setStaff(response.data.staff);
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
            <Container className=''>
                <Row className='mb-3' style={{background:'white'}} >
                    <Col lg={3}  sm={6}className='my-2' >
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <h3 className='d-flex justify-content-end ' style={{ marginRight: '1rem', }}  width='500'><GrMoney /></h3>
                                
                                <small style={{ color: '#1184C2' ,fontFamily:'PT Serif'}} >
                                  <b>TRANSACTIONS</b>
                                  </small>
                                <br />
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>
                                  {`₦${(sumTotal).toLocaleString("en-US", {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 2
                                  })}bn`}
                              </p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}  sm={6} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <h3 className='d-flex justify-content-end ' style={{ marginRight: '1rem'}} ><GrGroup/></h3>
                                <small style={{ color: '#1184C2',fontFamily:'PT Serif' }} >
                                  <b>
                                  STAFF
                                  </b>
                                  </small>
                                  <br/>
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>{staff.length}</p>
                            </div>

                        </div>
                    </Col>
                    <Col lg={3}  sm={6} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <h3 className='d-flex justify-content-end ' style={{ marginRight: '1rem', fontFamily:'PT Serif' }} ><GiMoneyStack /></h3>
                                <small style={{ color: '#1184C2',fontFamily:'PT Serif' }} >
                                  <b>
                                  DEALS
                                  </b>
                                  </small>
                                  <br/>
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>{data.length}</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}  sm={6} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <h3 className='d-flex justify-content-end ' style={{ marginRight: '1rem' ,fontFamily:'PT Serif'}} >< CgCalculator /></h3>
                                <small style={{ color: '#1184C2',fontFamily:'PT Serif' }} >
                                  <b>
                                  BUDGET
                                  </b>
                                  <br/>
                                  </small>
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>0</p>
                            </div>

                        </div>
                    </Col>
                </Row>

            </Container>

        </React.Fragment>
    )
}