import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import StaffView from './Components/Staffs/StaffView';
import Landing from './Components/LandingPage/Landing';
import Main from './Components/Auth/MainPage/Main';
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import TransactionCards from './Components/Transactions/TransactionCards';
import NewTransactions from './Components/Transactions/NewTransactions';
import TransactionView from './Components/Transactions/TransactionView'
=======
>>>>>>> 1cc638c43288da261f9886a850154ec5f9195860
import './App.css'
import styled from 'styled-components'
import StaffView from './Components/Staffs/StaffView'

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
            <StaffView/>
            
            
        </React.Fragment>
        </BodyContainer>
    );
}