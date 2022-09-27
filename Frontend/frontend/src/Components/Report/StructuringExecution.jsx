import React,{useContext} from "react";
import { Stack, Container ,Table} from "react-bootstrap";
import StructuringItem from "./StructuringItem";
import TransactionChart from "./TransactionChart";
import Editable from "react-editable-title";
import TitleContext from "../../context/TitleContext";

export default function StructuringExecution() {
  const handleStatsYear = (current) => {
    addStructuring(current);
  };
  const {structuringDev,addStructuring } =useContext(TitleContext);

  return (
    <React.Fragment>
      <br/>
      
      <Container className='my-3 pt-2'>
        <Stack gap={1} style={{ fontWeight: "bold", fontSize:'18px'}}>
        <Editable
            text={structuringDev}
            editButtonStyle={{ lineHeight: "unset" }}
            editButton
            editControlButtons
            placeholder="Type here"
            cb={handleStatsYear}
          />
        </Stack>
        <div>
          <p style={{ fontWeight: "bold" }}>
            Structuring & Execution Activities
          </p>
          <p style={{ fontWeight: "bold" }}>Progress on Due Diligence</p>
          <StructuringItem/>

        </div>
        <div className='mt-3'>
          <p style={{ fontWeight: "bold" }}>Progress on Structuring</p>
          <StructuringItem/>

        </div>
        <div className='mt-3'>
          <p style={{ fontWeight: "bold" }}>Progress on Execution</p>
          <StructuringItem/>

        </div>
     </Container>

     <Container>
   <TransactionChart/>
     </Container>
    </React.Fragment>
  );
}
