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
import TitleContext from '../../context/TitleContext';




export default function SubCards() {
    const { filteredStore, addFtYear} = useContext(TitleContext)
    const [totalTransaction, setTotalTransaction] = useState([]);
    const [data, setData] = useState([])
    const [length, setLength] = useState([])

    const newStore = JSON.parse(filteredStore)

    useEffect(() => {
        retrieveDeals()
    },[newStore])

    const retrieveDeals = async() => {
        await Service.getMyDeals(newStore)
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
                <Row className='mb-3'  style={{background:'white'}} >
                    <Col sm={6} className='my-2' style={{borderRight:'1px solid black'}} >
                        <div className='py-1'>
                            <div >
                                <h3 className='d-flex justify-content-end ' style={{ marginRight: '1rem', }}  width='500'><GrMoney /></h3>
                                
                                <small style={{ color: '#1184C2' ,fontFamily:'PT Serif'}} >
                                  <b>TRANSACTIONS</b>
                                  </small>
                                <br />
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>{`₦${(sumTotal).toFixed(1)}bn`}</p>
                            </div>
                        </div>
                    </Col>
                    
                    <Col sm={6} className='my-2 py-1'>
                        <div className='py-1'>
                            <div style={{paddingLeft:'10px'}}>
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
                    
                </Row>

            </Container>

        </React.Fragment>
    )
}