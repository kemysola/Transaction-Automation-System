import React,{useEffect, useState} from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { BiReceipt } from 'react-icons/bi';
import { GrGroup } from 'react-icons/gr';
import { FaRegHandshake } from 'react-icons/fa';
import { CgCalculator } from 'react-icons/cg'
import Service from '../../Services/Service';
import Stats from '../Dashboard/Management/Cards/Stats';



export default function SubCards() {
    const [totalTransaction, setTotalTransaction] = useState([]);
    const [data, setData] = useState([])
    const [length, setLength] = useState([])

    useEffect(() => {
        retrieveDeals()

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

      /*var red = totalTransaction.reduce(function (filtered, arr) {
        if (arr.deal_category === "Red") {
          var someNewValue = arr.dealsize;
          filtered.push(someNewValue);
        }
        return filtered;
      }, []);
    
      var amber = totalTransaction.reduce(function (filtered, arr) {
        if (arr.deal_category === "Yellow") {
          var someNewValue = arr.dealsize;
          filtered.push(someNewValue);
        }
        return filtered;
      }, []);
    
      var green = totalTransaction.reduce(function (filtered, arr) {
        if (arr.deal_category === "Green") {
          var someNewValue = arr.dealsize;
          filtered.push(someNewValue);
        }
        return filtered;
      }, []);
    
      // ......... Return deal_category total ...............................................
    
      var redTotal = red.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      var amberTotal = amber.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);
    
      var greenTotal = green.reduce(function (tot, arr) {
        return tot + parseFloat(arr);
      }, 0);*/

      var sumTotal = data.reduce(function (tot, arr) {
        return tot + parseFloat(arr.dealsize);
      }, 0);


      

    return (
        <React.Fragment>
            <Container>
                <Row className='mb-3' >
                    <Col sm={3}>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><BiReceipt /></p>
                                <small style={{ color: '#1184C2' }} >Transactions</small>
                                <br />
                                <h5>{sumTotal}</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><GrGroup /></p>
                                <small style={{ color: '#1184C2' }} >Staffs</small>
                                <h5>3290000</h5>
                            </div>

                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} ><FaRegHandshake /></p>
                                <small style={{ color: '#1184C2' }} >Deals</small>
                                <h5>{sumTotal}</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} className='my-2'>
                        <div className='py-1'>
                            <div style={{ borderRight: '1px solid black' }}>
                                <p className='d-flex justify-content-end ' style={{ marginRight: '1rem' }} >< CgCalculator /></p>
                                <small style={{ color: '#1184C2' }} >Budget</small>
                                <h5>3290000</h5>
                            </div>

                        </div>
                    </Col>
                </Row>

            </Container>

        </React.Fragment>
    )
}