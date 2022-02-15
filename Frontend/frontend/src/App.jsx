import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StaffView from './Components/Staffs/StaffView';
import Landing from './Components/LandingPage/Landing';
import Main from './Components/Auth/MainPage/Main';
import UpdateStaffs from './Components/Staffs/UpdateStaffs';
import TransactionCards from './Components/Transactions/TransactionCards';
import NewTransactions from './Components/Transactions/NewTransactions';
import TransactionView from './Components/Transactions/TransactionView'
import NewStaffs from './Components/Staffs/NewStaff';
import StaffDatabase from './Components/Staffs/StaffDatabase';
import AllStaff from './Pages/Staffs/AllStaff';
import UpdateStaff from './Pages/Staffs/UpdateStaff';
import NewTransaction from './Pages/Transactions/NewTransaction';
import UpdateTransaction from './Pages/Transactions/UpdateTransaction';
import './App.css'
import styled from 'styled-components'

const BodyContainer = styled.div`
margin:-0.22px;
width:100vw;
height:auto;
min-height:100vh;
background: #eff1f1;
overflow:hidden;
`

export default function App() {
    return (
        <BodyContainer>
        <React.Fragment>
            <NewStaffs/>
            {/* <StaffView /> */}
            {/* <AllStaff /> */}
            {/* <StaffDatabase /> */}

            {/* <TransactionView /> */}
            {/* <NewTransaction /> */}
            {/* <UpdateTransaction /> */}
            
        </React.Fragment>
        </BodyContainer>
    );
}