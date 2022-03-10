import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Row,Col} from 'react-bootstrap';
import SideNav2 from '../../LandingPage/SideNav2';
import Navbar from '../../LandingPage/Navbar';
import Progress from './Cards/Progress';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from 'recharts';
import Service from '../../../Services/Service';

const ViewWrapper = styled.div`
  background: #eff1f1;
  margin:0;
  padding: 0 10px;

`;
  

export default function MgtView() {

  const [data, setData] = useState([])

  useEffect(() => {
    retrieveDeals();
  }, []); 

  const retrieveDeals = () => {
    Service.getAllDeals()
      .then((response) => {
        setData(response.data.deals);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log("I am the data", data)
  
  let option1 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'On-grid Power') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option2 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Off-grid Power') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option3 = data.reduce(function(filtered, arr) {

    if (arr.deal_category === 'Agric Infra') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);

  let option4 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Gas') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option5 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Transportation') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option6 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Inputs to Infra.') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);


  let option7 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Affordable Housing') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option8 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Education Infra.') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option9 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Healthcare') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);

  let option10 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'Water/Waste') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);



  let option11 = data.reduce(function(filtered, arr) {

    if (arr.industry === 'ICT/Telecoms') {

       let someNewValue = arr.dealsize

       filtered.push(someNewValue);

    }

    return filtered;

  }, []);


  let option1Total = option1.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option2Total = option2.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option3Total = option3.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)

  let option4Total = option4.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option5Total = option5.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option6Total = option6.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)


  
  let option7Total = option7.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option8Total = option8.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option9Total = option9.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)

  let option10Total = option10.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)



  let option11Total = option11.reduce(function(tot, arr) {

    return tot + parseFloat(arr);

  }, 0)

    
    return(
        <React.Fragment>
            <Navbar/>
            <ViewWrapper>
            <Row>
                    <Col sm={3} style={{padding:'10px'}}>
                        <SideNav2/>
                    </Col>
                    <Col sm={7}> 
                        <Progress/>
                    </Col>
                    <Col sm={1}>  
                    </Col>
                </Row>
            </ViewWrapper>

        </React.Fragment>

    )
}

