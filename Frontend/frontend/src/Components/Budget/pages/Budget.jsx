import React from "react";
import TransactionTable from './TransactionTable'

export default function Budget(props) {
  return (
    <>
      <TransactionTable id={props.id}/>
    </>
  );
}
