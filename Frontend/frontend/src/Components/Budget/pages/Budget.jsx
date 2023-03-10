import React from "react";
import TransactionTable from './TransactionTable'
import AmortizationSchedule from './AmortizationSchedule'


export default function Budget(props) {
  return (
    <>
      <TransactionTable id={props.id}/>
      {/* <AmortizationSchedule/> */}
    </>
  );
}
