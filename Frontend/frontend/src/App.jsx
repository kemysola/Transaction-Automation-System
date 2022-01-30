import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import styled from 'styled-components'
import TransactionView from './Components/Transactions/TransactionView'

const BodyContainer = styled.div`
margin:-0.22px;
width:100vw;
height:120vh;
background: #eff1f1;
overflow:hidden;

`



export default function App() {
   
    return (
        <BodyContainer>
        <React.Fragment>
            <TransactionView/>
            
            
        </React.Fragment>
        </BodyContainer>
    );
}