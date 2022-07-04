import React , {useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Navbar from '../LandingPage/Navbar'
import Sidenav from '../LandingPage/SideNav2'
import CurrentGuarantee from './CurrentGuarantee'
import GuaranteePortGrowthVsTar from './GuaranteePortGrowthVsTar';
import Editable from "react-editable-title";


export default function AllPages() {
  const [title, setTitle] = useState("Current Guarantee Portfolio")
  const handleTextUpdate = current => {
    setTitle(current);

  };

  useEffect(() => {

  }, []);


  return (
    <React.Fragment>
      <Navbar/>
      <Row>
        <Col sm='3'>
          <Sidenav/>
        </Col>
        <Col sm ='8'>
        <p
        style={{
          fontWeight:'bold',
          marginLeft:'1.5rem'
        }}
      >
        <Editable
          text={title}
          editButtonStyle={{ lineHeight: "unset" }}
          editButton
          editControlButtons
          placeholder="Type here"
          cb={handleTextUpdate}
        />
        </p>

          
          {/* set state ... user's input */}
          <CurrentGuarantee/>
          {/* <GuaranteePortGrowthVsTar/> */}
        </Col>
      </Row>
    </React.Fragment>
  )
}
