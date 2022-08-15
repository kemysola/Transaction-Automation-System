import React from "react";
import { Stack, Container ,Table} from "react-bootstrap";
import StructuringItem from "./StructuringItem";
import TransactionChart from "./TransactionChart";

export default function StructuringExecution() {
  return (
    <React.Fragment>
      <br/>
      
      <Container className='my-3 pt-2'>
        <Stack gap={1} style={{ fontWeight: "bold", fontSize:'18px'}}>
          Structuring & Execution – Q4 2021 Developments
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
