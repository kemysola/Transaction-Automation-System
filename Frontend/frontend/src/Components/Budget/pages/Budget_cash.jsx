import React, { useState, useEffect } from "react";
import Budget from "./Budget";
import CashTable from "./CashTable";
import {Row,Col} from 'react-bootstrap'
import Navbar from "../../LandingPage/Navbar";
import Sidenav from "../../LandingPage/SideNav2";
import Skeleton from "react-loading-skeleton";
import axios from 'axios'


export default function Budget_cash() {
  const [cashData, setCashData] = useState();
  const [guaranteeFee, setGuaranteeFee] = useState();
  const [monitoringFee, setMonitoringFee] =useState()
  const [structuringFee, setStructuringFee] =useState()
  const [clientName, setClientName] =useState()


  let id = window.location.search.split("?")[1];

  useEffect(() => {
    retrieveDeal()
  }, [id]);

  const retrieveDeal =  async() => {
    let data =  await axios
      .get(
         `https://trms01-server.azurewebsites.net/api/v1/transaction/item/${id}/${JSON.parse(localStorage.getItem("fy"))}`,
        // `http://localhost:5001/api/v1/transaction/item/${id}/${JSON.parse(
        //   localStorage.getItem("fy")
        // )}`,
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=utf-8",
          },
        }
        
      )
      .catch((e) => {});
      
      setCashData(data?.data?.dealInfo)
      setGuaranteeFee(data.data.dealInfo[0].guaranteefee);
      setMonitoringFee(data.data.dealInfo[0].monitoringfee)
      setStructuringFee(data.data.dealInfo[0].structuringfeeamount)
      setClientName(data.data.dealInfo[0].clientname)

    }
  return (
    <>
    <Navbar/>
    <Row>
        <Col sm={2}>
          <Sidenav />
        </Col>
        <Col sm={10} className={{marginRight:'1rem'}}>
          <div className="text-secondary text-center mb-3">BUDGET MODULE</div>

            {/* <p style={{fontWeight:'bold'}}>InfraCredit</p> */}
            <Row>
                <Col sm={6}>
                <Budget id={id}/>
                </Col>
                <Col sm={6}>
                <CashTable guaranteeFee={guaranteeFee} monitoringFee={monitoringFee} structuringFee={structuringFee} clientName={clientName} id={id}/>
                </Col>

            </Row>


                  {/* <Col className='pb-2 mb-2'>
                    <Skeleton
                      baseColor="whitesmoke"
                      highlightColor="gray"
                      count={5}
                    />
                  </Col> */}
                  {/* <Col>
                    <Skeleton
                      baseColor="whitesmoke"
                      highlightColor="white"
                      count={5}
                    />
                  </Col>
                  <Col>
                    <Skeleton
                      baseColor="whitesmoke"
                      highlightColor="white"
                      count={5}
                    />
                  </Col> */}
                


        
           


        </Col>
      </Row>
    
      {/* <div>
        <Row>
            <Col sm={6}>
            <Budget />

            </Col>
            <Col sm={6}>
                <br/>
                <br/>
                <br/>
                <CashTable guaranteeFee={guaranteeFee} monitoringFee={monitoringFee} structuringFee={structuringFee}/>

</Col>

        </Row>
      </div> */}
    </>
  );
}
