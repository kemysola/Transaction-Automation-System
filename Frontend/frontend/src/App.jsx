import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Components/LandingPage/Landing';
import TransactionView from './Components/Transactions/TransactionView';



export default function App() {
   
    return (
        <React.Fragment>
            <TransactionView/>
            
        </React.Fragment>
    );
}