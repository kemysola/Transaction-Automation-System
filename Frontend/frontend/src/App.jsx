import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTransactions from './Components/Transactions/NewTransactions';
import styled from 'styled-components'


const AppWrapper = styled.div`
background:green;
`;

export default function App() {
   
    return (
        <React.Fragment>
            <NewTransactions/>
            
        </React.Fragment>
    );
}